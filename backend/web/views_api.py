"""
API Views for GB Technologies Decoupled Architecture (/api/v1/).
"""

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings
from django.db import connection
from drf_spectacular.utils import extend_schema, OpenApiResponse
from datetime import datetime

from .models import ContactLead
from .serializers import (
    CurrentUserSerializer,
    RegisterSerializer,
    ContactLeadSerializer,
)


def _set_auth_cookies(response, access_token, refresh_token=None):
    """Utility to set secure HTTP-only cookies on responses."""
    cookie_secure = not settings.DEBUG
    samesite = 'Strict' if cookie_secure else 'Lax'

    # Access Token: 15 min expiry
    response.set_cookie(
        key='access_token',
        value=str(access_token),
        max_age=15 * 60,
        httponly=True,
        secure=cookie_secure,
        samesite=samesite,
        path='/',
    )

    # Refresh Token: 7 days expiry
    if refresh_token:
        response.set_cookie(
            key='refresh_token',
            value=str(refresh_token),
            max_age=7 * 24 * 60 * 60,
            httponly=True,
            secure=cookie_secure,
            samesite=samesite,
            path='/api/v1/auth/token/refresh/',
        )


def _clear_auth_cookies(response):
    """Utility to delete auth cookies on logout."""
    response.delete_cookie('access_token', path='/')
    response.delete_cookie('refresh_token', path='/api/v1/auth/token/refresh/')


class HealthCheckView(APIView):
    """Liveness and readiness health probe."""
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Service Health Check",
        description="Verify service availability and database connectivity.",
        responses={200: OpenApiResponse(description="Service is healthy")}
    )
    def get(self, request):
        db_status = "healthy"
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception as exc:
            db_status = f"unhealthy: {str(exc)}"

        return Response({
            "status": "healthy" if db_status == "healthy" else "degraded",
            "database": db_status,
            "version": "1.0.0",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })


class CookieTokenObtainPairView(TokenObtainPairView):
    """Exchange username/email and password for JWT tokens and set HttpOnly cookies."""
    @extend_schema(summary="User Login (JWT & HttpOnly Cookies)")
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        tokens = serializer.validated_data
        access_token = tokens.get('access')
        refresh_token = tokens.get('refresh')

        response = Response({
            "message": "Authentication successful",
            "access": access_token,
            "refresh": refresh_token,
        }, status=status.HTTP_200_OK)

        _set_auth_cookies(response, access_token, refresh_token)
        return response


class CookieTokenRefreshView(TokenRefreshView):
    """Rotate access token using refresh token stored in cookie or request payload."""
    @extend_schema(summary="Refresh JWT Access Token")
    def post(self, request, *args, **kwargs):
        # Support reading refresh token from either cookie or request body
        refresh_token = request.COOKIES.get('refresh_token')
        if not request.data.get('refresh') and refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get('access')
            new_refresh = response.data.get('refresh')
            _set_auth_cookies(response, access_token, new_refresh)

        return response


class LogoutAPIView(APIView):
    """Blacklist refresh token and remove HttpOnly cookies."""
    permission_classes = [AllowAny]

    @extend_schema(
        summary="User Logout",
        request=None,
        responses={200: OpenApiResponse(description="Successfully logged out")}
    )
    def post(self, request):
        refresh_token = request.data.get('refresh') or request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except (TokenError, Exception):
                pass  # Ignore already expired or invalid tokens

        response = Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        _clear_auth_cookies(response)
        return response


class RegisterAPIView(generics.CreateAPIView):
    """Register a new user account with default profile."""
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    @extend_schema(summary="Register New User Account")
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate tokens immediately upon registration
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        user_serializer = CurrentUserSerializer(user, context={'request': request})
        response = Response({
            "message": "Registration successful",
            "user": user_serializer.data,
            "access": access_token,
            "refresh": refresh_token,
        }, status=status.HTTP_201_CREATED)

        _set_auth_cookies(response, access_token, refresh_token)
        return response


class CurrentUserAPIView(generics.RetrieveUpdateAPIView):
    """Retrieve or update profile details for the currently authenticated user."""
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer

    @extend_schema(summary="Get Current User Profile")
    def get_object(self):
        return self.request.user


class ContactLeadCreateAPIView(generics.CreateAPIView):
    """Submit enterprise consultation request / lead inquiry."""
    permission_classes = [AllowAny]
    serializer_class = ContactLeadSerializer
    queryset = ContactLead.objects.all()

    @extend_schema(summary="Submit Contact & Lead Inquiry")
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Thank you for reaching out. A senior technical advisor will contact you within 24 hours.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)
