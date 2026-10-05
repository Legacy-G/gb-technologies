from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    KYC_STATUS_CHOICES = [
        ('unverified', 'Unverified'),
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]

    KYC_ID_TYPE_CHOICES = [
        ('passport', 'Passport'),
        ('national_id', 'National ID Card'),
        ('drivers_license', "Driver's License"),
        ('tax_certificate', 'Corporate Tax / Registration Certificate'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    middlename = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True, default='')
    bio = models.TextField(blank=True, default='')
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    country = models.CharField(max_length=50, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', default='default.png', blank=True)

    # Enterprise KYC Verification Fields
    kyc_status = models.CharField(max_length=20, choices=KYC_STATUS_CHOICES, default='unverified')
    kyc_id_type = models.CharField(max_length=50, choices=KYC_ID_TYPE_CHOICES, blank=True, default='')
    kyc_id_number = models.CharField(max_length=100, blank=True, default='')
    kyc_document = models.FileField(upload_to='kyc_documents/', blank=True, null=True)
    kyc_submitted_at = models.DateTimeField(null=True, blank=True)
    kyc_verified_at = models.DateTimeField(null=True, blank=True)
    kyc_rejection_reason = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.user.username} ({self.company or 'Personal'}) - KYC: {self.kyc_status}"


class ContactLead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    service_interest = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.service_interest}"


class WebsiteSpeedAudit(models.Model):
    url = models.URLField(max_length=500)
    monthly_visitors = models.PositiveIntegerField(default=50000)
    average_deal_value = models.DecimalField(max_digits=12, decimal_places=2, default=500.00)
    conversion_rate = models.FloatField(default=2.0)
    measured_fcp = models.FloatField(default=3.2)
    measured_lcp = models.FloatField(default=4.8)
    lighthouse_score = models.PositiveSmallIntegerField(default=45)
    annual_revenue_lost = models.DecimalField(max_digits=14, decimal_places=2, default=0.00)
    annual_recoverable_revenue = models.DecimalField(max_digits=14, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Audit: {self.url} (Score: {self.lighthouse_score}/100, Lost: ${self.annual_revenue_lost})"
