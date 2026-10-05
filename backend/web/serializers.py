"""
Django REST Framework serializers for GB Technologies Decoupled Platform.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.db.models import Q
from decimal import Decimal
from .models import UserProfile, ContactLead, WebsiteSpeedAudit
import re


from drf_spectacular.utils import extend_schema_field


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile metadata, including phone validation and image URLs."""
    profile_image_url = serializers.SerializerMethodField()
    kyc_document_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'middlename',
            'company',
            'job_title',
            'bio',
            'date_of_birth',
            'phone_number',
            'country',
            'profile_image',
            'profile_image_url',
            'kyc_status',
            'kyc_id_type',
            'kyc_id_number',
            'kyc_document',
            'kyc_document_url',
            'kyc_submitted_at',
            'kyc_verified_at',
            'kyc_rejection_reason',
        ]
        read_only_fields = [
            'profile_image_url',
            'kyc_document_url',
            'kyc_submitted_at',
            'kyc_verified_at',
            'kyc_status',
            'kyc_rejection_reason',
        ]
        extra_kwargs = {
            'profile_image': {'write_only': True, 'required': False},
            'kyc_document': {'write_only': True, 'required': False},
        }

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_profile_image_url(self, obj) -> str | None:
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_kyc_document_url(self, obj) -> str | None:
        if obj.kyc_document:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.kyc_document.url)
            return obj.kyc_document.url
        return None

    def validate_phone_number(self, value):
        if value:
            # E.164 international phone number format: e.g. +14155552671
            pattern = r'^\+?[1-9]\d{1,14}$'
            if not re.match(pattern, value):
                raise serializers.ValidationError(
                    "Enter a valid international phone number in E.164 format (e.g. +14155552671)."
                )
        return value


class CurrentUserSerializer(serializers.ModelSerializer):
    """Serializer for viewing and updating the authenticated user account and nested profile."""
    profile = UserProfileSerializer(source='userprofile')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'profile']
        read_only_fields = ['id', 'username', 'is_staff']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})

        # Also support flat profile fields passed directly in initial_data (e.g. multipart/form-data)
        initial_data = getattr(self, 'initial_data', {})
        flat_fields = [
            'company', 'job_title', 'bio', 'phone_number',
            'country', 'date_of_birth', 'middlename'
        ]
        for field in flat_fields:
            if field in initial_data and field not in profile_data:
                profile_data[field] = initial_data[field]
        if 'profile_image' in initial_data and 'profile_image' not in profile_data:
            profile_data['profile_image'] = initial_data['profile_image']

        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create UserProfile fields
        profile, _ = UserProfile.objects.get_or_create(user=instance)
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance


class KYCSubmissionSerializer(serializers.Serializer):
    """Serializer for submitting identity verification documents for enterprise compliance review."""
    id_type = serializers.ChoiceField(choices=UserProfile.KYC_ID_TYPE_CHOICES, required=True)
    id_number = serializers.CharField(max_length=100, required=True)
    document = serializers.FileField(required=True)


class KYCReviewSerializer(serializers.Serializer):
    """Serializer for reviewing and approving/rejecting user KYC verification status."""
    status = serializers.ChoiceField(choices=['verified', 'rejected', 'unverified', 'pending'], required=True)
    rejection_reason = serializers.CharField(max_length=500, required=False, allow_blank=True, default='')


class EmailOrUsernameTokenObtainPairSerializer(serializers.Serializer):
    """
    Custom JWT Authentication Serializer supporting login by either username or email address.
    Performs case-insensitive matching and authenticates user password.
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username_or_email = attrs.get('username', '').strip()
        password = attrs.get('password', '')

        if not username_or_email or not password:
            raise serializers.ValidationError({"detail": "Username/email and password are required."})

        # Lookup candidate users matching either username or email (case-insensitive)
        candidates = list(User.objects.filter(
            Q(username__iexact=username_or_email) | Q(email__iexact=username_or_email)
        ).order_by('-date_joined'))

        from rest_framework.exceptions import AuthenticationFailed

        if not candidates:
            raise AuthenticationFailed("No active account found with the given credentials.")

        # Find matching user whose password is correct
        matched_user = None
        for candidate in candidates:
            if candidate.check_password(password):
                matched_user = candidate
                break

        if not matched_user:
            raise AuthenticationFailed("No active account found with the given credentials.")

        if not matched_user.is_active:
            raise AuthenticationFailed("This user account is inactive. Please contact support.")

        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(matched_user)
        self.user = matched_user

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for client onboarding and account registration."""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)
    company = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name', 'company']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Password fields do not match."})
        username = attrs.get('username', '').strip()
        email = attrs.get('email', '').strip()
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({"username": "This username is already taken. Please sign in or choose another."})
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "An account with this email address already exists. Please sign in instead."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        company = validated_data.pop('company', '')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()

        if company:
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.company = company
            profile.save()
            user.userprofile = profile

        return user


class ContactLeadSerializer(serializers.ModelSerializer):
    """Serializer for enterprise inquiry and lead submission."""
    class Meta:
        model = ContactLead
        fields = ['id', 'name', 'email', 'company', 'service_interest', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class WebsiteSpeedAuditSerializer(serializers.ModelSerializer):
    """Serializer for website speed diagnostics and annual revenue loss estimation."""
    url = serializers.CharField(max_length=500)
    monthly_visitors = serializers.IntegerField(default=50000, min_value=500, max_value=50000000)
    average_deal_value = serializers.DecimalField(max_digits=12, decimal_places=2, default=500.00, min_value=Decimal('1.00'))
    conversion_rate = serializers.FloatField(default=2.0, min_value=0.1, max_value=50.0)

    class Meta:
        model = WebsiteSpeedAudit
        fields = [
            'id',
            'url',
            'monthly_visitors',
            'average_deal_value',
            'conversion_rate',
            'measured_fcp',
            'measured_lcp',
            'lighthouse_score',
            'annual_revenue_lost',
            'annual_recoverable_revenue',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'measured_fcp',
            'measured_lcp',
            'lighthouse_score',
            'annual_revenue_lost',
            'annual_recoverable_revenue',
            'created_at',
        ]

    def validate_url(self, value):
        value = value.strip()
        if not value.startswith(('http://', 'https://')):
            value = f'https://{value}'
        return value
