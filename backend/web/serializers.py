"""
Django REST Framework serializers for GB Technologies Decoupled Platform.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from decimal import Decimal
from .models import UserProfile, ContactLead, WebsiteSpeedAudit
import re


from drf_spectacular.utils import extend_schema_field


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile metadata, including phone validation and image URLs."""
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'middlename',
            'date_of_birth',
            'phone_number',
            'country',
            'profile_image',
            'profile_image_url',
        ]
        read_only_fields = ['profile_image_url']
        extra_kwargs = {
            'profile_image': {'write_only': True, 'required': False}
        }

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_profile_image_url(self, obj) -> str | None:
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
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


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for client onboarding and account registration."""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Password fields do not match."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email address already exists."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
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
