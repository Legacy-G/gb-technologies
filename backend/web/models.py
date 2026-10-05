from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    middlename = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    country = models.CharField(max_length=50, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', default='default.png')

    def __str__(self):
        return self.user.username


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
