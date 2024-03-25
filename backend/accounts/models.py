import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, gender, password, **extra_fields):
        if not email:
            raise ValueError('Email must be set')
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            first_name=first_name,
            last_name=last_name,
            gender = gender,
            is_active=True,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, first_name, last_name, gender, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, first_name, last_name, gender, password, **extra_fields)

    def get_by_natural_key(self, email):
        return self.get(email=email)

USER_TYPES = (
    ('student', 'Student'),
    ('lecturer', 'Lecturer'),
    ('admin', 'Admin'),
)

YEAR_CHOICES = (
    (1, '1st year'),
    (2, '2nd year'),
    (3, '3rd year'),
    (4, '4th year'),
)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    year = models.IntegerField(choices=YEAR_CHOICES, default=1)
    student_id = models.CharField(max_length=10, unique=True, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gpa = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(4.0)], default=0)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')))
    img = models.ImageField(upload_to='images/', blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='student')
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'gender', 'user_type']

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if not self.student_id:  # Generate student_id only if not provided
            self.student_id = str(uuid.uuid4().hex)[:10].upper()  # Generate a unique student ID
        super().save(*args, **kwargs)
