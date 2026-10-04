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
    ContactLeadCreateAPIView,
    WebsiteSpeedAuditAPIView,
)

app_name = 'api_v1'

urlpatterns = [
    # Health probe
    path('health/', HealthCheckView.as_view(), name='health'),

    # Authentication
    path('auth/login/', CookieTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/refresh/', CookieTokenRefreshView.as_view(), name='auth_refresh'),
    path('auth/logout/', LogoutAPIView.as_view(), name='auth_logout'),
    path('auth/register/', RegisterAPIView.as_view(), name='auth_register'),

    # Current User Profile
    path('users/me/', CurrentUserAPIView.as_view(), name='current_user'),

    # Contact & Leads
    path('contact/leads/', ContactLeadCreateAPIView.as_view(), name='contact_leads'),

    # Live Website Speed & Revenue Loss Diagnostic
    path('audit/speed-loss/', WebsiteSpeedAuditAPIView.as_view(), name='audit_speed_loss'),
]
