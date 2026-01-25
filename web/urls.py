from django.urls import path
from . import views

urlpatterns = [
    # URL patterns for the web app
    # The landing page is now set to 'landing.html'
    path('', views.landing, name='landing'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register, name='register'),
    path('home/', views.index, name='index'),  # index.html is now at /home/
    path('profile/', views.profile_view, name='view_profile'),  # Profile view
    path('profile/edit/', views.edit_profile, name='edit_profile'),  # Edit profile view
    
]