from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.text import capfirst
from .models import UserProfile

# Define a list of countries for the registration form
# This can be expanded as needed
COUNTRY_CHOICES = [
    ('Nigeria', 'Nigeria'),
    ('Ghana', 'Ghana'),
    ('Kenya', 'Kenya'),
    ('South Africa', 'South Africa'),
    ('USA', 'United States'),
    ('UK', 'United Kingdom'),
    # Add more countries as needed
]

class LoginForm(forms.Form):
    identifier = forms.CharField(label='Username or Email')
    password = forms.CharField(widget=forms.PasswordInput())
    def clean_identifier(self):
        identifier = self.cleaned_data.get('identifier')
        if not identifier:
            raise ValidationError("This field is required.")
        return identifier

class RegisterForm(forms.ModelForm):
    surname = forms.CharField(max_length=50)
    middlename = forms.CharField(max_length=50, required=False)
    first_name = forms.CharField(max_length=50)
    date_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    phone_number = forms.CharField(max_length=15)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())
    confirm_password = forms.CharField(widget=forms.PasswordInput())
    country = forms.ChoiceField(choices=COUNTRY_CHOICES)

    class Meta:
        model = User
        fields = ['email']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords do not match.")
        return cleaned_data


class EditProfileForm(forms.ModelForm):
    first_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)
    email = forms.EmailField()
    profile_image = forms.ImageField(required=False)

    class Meta:
        model = UserProfile
        fields = ['middlename', 'date_of_birth', 'phone_number', 'country', 'profile_image']

