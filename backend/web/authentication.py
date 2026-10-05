"""
Custom Authentication Classes for GB Technologies.
"""

from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.extensions import OpenApiAuthenticationExtension


class CookieJWTAuthentication(JWTAuthentication):
    """Authenticate requests using either standard Authorization header or HttpOnly access_token cookie."""
    def authenticate(self, request):
        header = self.get_header(request)
        if header is not None:
            raw_token = self.get_raw_token(header)
        else:
            raw_token = request.COOKIES.get('access_token')

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token


class CookieJWTScheme(OpenApiAuthenticationExtension):
    target_class = 'web.authentication.CookieJWTAuthentication'
    name = 'jwtCookieAuth'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'apiKey',
            'in': 'cookie',
            'name': 'access_token',
            'description': 'HttpOnly JWT access token stored in browser cookie or Authorization Bearer header',
        }
