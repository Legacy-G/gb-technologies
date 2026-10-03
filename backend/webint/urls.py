"""
URL configuration for webint project (GB Technologies Decoupled Architecture).
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    # Staff Administration
    path('admin/', admin.site.urls),

    # Version 1 REST API
    path('api/v1/', include('web.urls_api', namespace='api_v1')),

    # OpenAPI 3.1 Schema & Interactive Documentation
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Legacy Server-Rendered Django Pages (Strangler pattern fallback)
    path('', include('web.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
