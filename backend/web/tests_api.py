"""
Automated unit tests for GB Technologies REST API (/api/v1/).
"""

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from web.models import UserProfile, ContactLead, WebsiteSpeedAudit


class GBTechnologiesAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_username = "testengineer"
        self.test_email = "engineer@gb-technologies.com"
        self.test_password = "SecurePassword123!"
        self.user = User.objects.create_user(
            username=self.test_username,
            email=self.test_email,
            password=self.test_password,
            first_name="Jane",
            last_name="Doe",
        )
        self.profile = self.user.userprofile
        self.profile.middlename = "Alex"
        self.profile.phone_number = "+14155552671"
        self.profile.country = "United States"
        self.profile.save()

    def test_health_check(self):
        """Test GET /api/v1/health/ returns healthy status."""
        url = reverse('api_v1:health')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')
        self.assertEqual(response.data['database'], 'healthy')

    def test_openapi_schema(self):
        """Test GET /api/v1/schema/ generates valid OpenAPI schema."""
        url = reverse('schema')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('openapi', response.data)

    def test_user_login_success(self):
        """Test POST /api/v1/auth/login/ issues tokens and sets auth cookies."""
        url = reverse('api_v1:auth_login')
        payload = {
            "username": self.test_username,
            "password": self.test_password,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)

    def test_user_registration(self):
        """Test POST /api/v1/auth/register/ creates user and profile."""
        url = reverse('api_v1:auth_register')
        payload = {
            "username": "newclient",
            "email": "client@enterprise.com",
            "password": "StrongPassword789!",
            "password_confirm": "StrongPassword789!",
            "first_name": "Alan",
            "last_name": "Turing",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="newclient").exists())
        new_user = User.objects.get(username="newclient")
        self.assertTrue(hasattr(new_user, 'userprofile'))
        self.assertIn('access_token', response.cookies)

    def test_current_user_profile_get_and_patch(self):
        """Test GET and PATCH /api/v1/users/me/ with Bearer token authentication."""
        # Authenticate
        self.client.force_authenticate(user=self.user)
        url = reverse('api_v1:current_user')

        # GET profile
        get_response = self.client.get(url)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_response.data['username'], self.test_username)
        self.assertEqual(get_response.data['profile']['phone_number'], "+14155552671")

        # PATCH profile
        patch_payload = {
            "first_name": "Janet",
            "profile": {
                "country": "Canada",
                "phone_number": "+14165559876",
            }
        }
        patch_response = self.client.patch(url, patch_payload, format='json')
        self.assertEqual(patch_response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.user.userprofile.refresh_from_db()
        self.assertEqual(self.user.first_name, "Janet")
        self.assertEqual(self.user.userprofile.country, "Canada")
        self.assertEqual(self.user.userprofile.phone_number, "+14165559876")

    def test_contact_lead_submission(self):
        """Test POST /api/v1/contact/leads/ captures lead."""
        url = reverse('api_v1:contact_leads')
        payload = {
            "name": "Sarah Connor",
            "email": "sarah@cyberdyne.com",
            "company": "Cyberdyne Systems",
            "service_interest": "Enterprise Cybersecurity",
            "message": "We need to conduct an architecture review for cloud defense.",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ContactLead.objects.filter(email="sarah@cyberdyne.com").exists())

    def test_logout(self):
        """Test POST /api/v1/auth/logout/ clears cookies."""
        url = reverse('api_v1:auth_logout')
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Successfully logged out", response.data['message'])

    def test_website_speed_audit_success(self):
        """Test POST /api/v1/audit/speed-loss/ executes diagnostic and calculates financial impact."""
        url = reverse('api_v1:audit_speed_loss')
        payload = {
            "url": "https://example.com",
            "monthly_visitors": 60000,
            "average_deal_value": 450.00,
            "conversion_rate": 2.5,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('metrics', response.data)
        self.assertIn('financial_impact', response.data)
        self.assertIn('decoupled_projection', response.data)
        self.assertGreater(response.data['metrics']['measured_fcp'], 0)
        self.assertGreater(response.data['financial_impact']['annual_revenue_lost'], 0)
        self.assertTrue(WebsiteSpeedAudit.objects.filter(url="https://example.com").exists())

    def test_website_speed_audit_url_normalization(self):
        """Test URL without scheme is normalized to https://."""
        url = reverse('api_v1:audit_speed_loss')
        payload = {
            "url": "acmecorp.com",
            "monthly_visitors": 25000,
            "average_deal_value": 300.00,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], "https://acmecorp.com")
        self.assertTrue(WebsiteSpeedAudit.objects.filter(url="https://acmecorp.com").exists())
