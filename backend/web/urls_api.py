"""
API URL patterns for /api/v1/.
"""

from django.urls import path
from .views_api import (
    HealthCheckView,
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    LogoutAPIView,
    RegisterAPIView,
    CurrentUserAPIView,
    KYCSubmissionAPIView,
    KYCReviewAPIView,
    ContactLeadCreateAPIView,
    WebsiteSpeedAuditAPIView,
    TelemetryMetricsAPIView,
)

app_name = 'api_v1'

urlpatterns = [
    # Health probe
    path('health/', HealthCheckView.as_view(), name='health'),

    # Real-Time Telemetry & Monitoring Graphs
    path('telemetry/', TelemetryMetricsAPIView.as_view(), name='telemetry'),

    # Authentication
    path('auth/login/', CookieTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/refresh/', CookieTokenRefreshView.as_view(), name='auth_refresh'),
    path('auth/logout/', LogoutAPIView.as_view(), name='auth_logout'),
    path('auth/register/', RegisterAPIView.as_view(), name='auth_register'),

    # Current User Profile & KYC
    path('users/me/', CurrentUserAPIView.as_view(), name='current_user'),
    path('users/kyc/', KYCSubmissionAPIView.as_view(), name='users_kyc'),
    path('users/kyc/review/', KYCReviewAPIView.as_view(), name='users_kyc_review'),

    # Contact & Leads
    path('contact/leads/', ContactLeadCreateAPIView.as_view(), name='contact_leads'),

    # Live Website Speed & Revenue Loss Diagnostic
    path('audit/speed-loss/', WebsiteSpeedAuditAPIView.as_view(), name='audit_speed_loss'),
]
