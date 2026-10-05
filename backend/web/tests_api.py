"""
Automated unit tests for GB Technologies REST API (/api/v1/).
"""

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
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
        """Test POST /api/v1/auth/login/ issues tokens, returns user data, and sets auth cookies."""
        url = reverse('api_v1:auth_login')
        payload = {
            "username": self.test_username,
            "password": self.test_password,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['username'], self.test_username)
        self.assertEqual(response.data['user']['first_name'], "Jane")
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)

    def test_user_registration(self):
        """Test POST /api/v1/auth/register/ creates user, company profile, and returns tokens."""
        url = reverse('api_v1:auth_register')
        payload = {
            "username": "newclient",
            "email": "client@enterprise.com",
            "password": "StrongPassword789!",
            "password_confirm": "StrongPassword789!",
            "first_name": "Alan",
            "last_name": "Turing",
            "company": "Turing Innovations",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="newclient").exists())
        new_user = User.objects.get(username="newclient")
        self.assertTrue(hasattr(new_user, 'userprofile'))
        self.assertEqual(new_user.userprofile.company, "Turing Innovations")
        self.assertEqual(response.data['user']['profile']['company'], "Turing Innovations")
        self.assertIn('access_token', response.cookies)

    def test_cookie_based_authentication(self):
        """Test GET /api/v1/users/me/ authenticates seamlessly via HttpOnly access_token cookie."""
        login_url = reverse('api_v1:auth_login')
        login_response = self.client.post(login_url, {
            "username": self.test_username,
            "password": self.test_password,
        }, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        access_token = login_response.data['access']

        # Create new unauthenticated client and set cookie
        cookie_client = APIClient()
        cookie_client.cookies['access_token'] = access_token

        me_url = reverse('api_v1:current_user')
        me_response = cookie_client.get(me_url)
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data['username'], self.test_username)
        self.assertEqual(me_response.data['email'], self.test_email)

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

    def test_contact_lead_list(self):
        """Test GET /api/v1/contact/leads/ lists captured leads."""
        ContactLead.objects.create(
            name="John Doe",
            email="john@example.com",
            company="Doe Enterprises",
            service_interest="Digital Flagship",
            message="Looking to modernize web infrastructure."
        )
        url = reverse('api_v1:contact_leads')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check either paginated results or list
        results = response.data.get('results', response.data)
        self.assertTrue(any(lead['email'] == "john@example.com" for lead in results))

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

    def test_telemetry_endpoint(self):
        """Test GET /api/v1/telemetry/ returns edge telemetry metrics."""
        url = reverse('api_v1:telemetry')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'online')
        self.assertIn('summary', response.data)
        self.assertIn('regions', response.data)
        self.assertIn('ttfb_timeline', response.data)
        self.assertEqual(len(response.data['ttfb_timeline']), 5)
        self.assertIn('projects_timeline', response.data)
        self.assertIn('cluster_nodes', response.data)
        self.assertEqual(len(response.data['cluster_nodes']), 32)

    def test_unregistered_user_login_fails_401(self):
        """Test POST /api/v1/auth/login/ strictly rejects unregistered user with 401."""
        url = reverse('api_v1:auth_login')
        payload = {
            "username": "nonexistent_client_user",
            "password": "WrongPassword123!",
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)

    def test_profile_update_job_title_and_bio(self):
        """Test PATCH /api/v1/users/me/ updates job title, bio, and company."""
        self.client.force_authenticate(user=self.user)
        url = reverse('api_v1:current_user')

        patch_payload = {
            "first_name": "Janet",
            "last_name": "Smith",
            "profile": {
                "company": "Apex Dynamics",
                "job_title": "Chief Technology Officer",
                "bio": "Leading cloud modernization and edge architectures.",
            }
        }
        response = self.client.patch(url, patch_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.user.userprofile.refresh_from_db()
        self.assertEqual(self.user.userprofile.company, "Apex Dynamics")
        self.assertEqual(self.user.userprofile.job_title, "Chief Technology Officer")
        self.assertEqual(self.user.userprofile.bio, "Leading cloud modernization and edge architectures.")

    def test_kyc_submission_and_review_workflow(self):
        """Test POST /api/v1/users/kyc/ submits documents and /review/ approves them."""
        self.client.force_authenticate(user=self.user)

        # 1. Initial status is unverified
        self.assertEqual(self.user.userprofile.kyc_status, 'unverified')

        # 2. Submit KYC documents
        kyc_url = reverse('api_v1:users_kyc')
        fake_doc = SimpleUploadedFile("passport.pdf", b"%PDF-1.4 fake pdf content", content_type="application/pdf")
        kyc_payload = {
            "id_type": "passport",
            "id_number": "USA-99887766",
            "document": fake_doc,
        }
        submit_res = self.client.post(kyc_url, kyc_payload, format='multipart')
        self.assertEqual(submit_res.status_code, status.HTTP_200_OK)

        self.user.userprofile.refresh_from_db()
        self.assertEqual(self.user.userprofile.kyc_status, 'pending')
        self.assertEqual(self.user.userprofile.kyc_id_type, 'passport')
        self.assertEqual(self.user.userprofile.kyc_id_number, 'USA-99887766')
        self.assertIsNotNone(self.user.userprofile.kyc_submitted_at)

        # 3. Review / Approve KYC
        review_url = reverse('api_v1:users_kyc_review')
        review_payload = {
            "status": "verified"
        }
        review_res = self.client.post(review_url, review_payload, format='json')
        self.assertEqual(review_res.status_code, status.HTTP_200_OK)

        self.user.userprofile.refresh_from_db()
        self.assertEqual(self.user.userprofile.kyc_status, 'verified')
        self.assertIsNotNone(self.user.userprofile.kyc_verified_at)

