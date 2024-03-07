from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

class Department(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Department")
        verbose_name_plural = ("Departments")

    def __str__(self):
        return self.name


SEMESTER_OPTIONS = (
    ('autumn', 'Autumn'),
    ('winter', 'Winter'),
    ('spring', 'Spring'),
    ('summer', 'Summer'),
)

class Course(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    syllabus = models.CharField(max_length=1000, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    credits = models.IntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(4)])
    semester = models.CharField(max_length=6, choices=SEMESTER_OPTIONS)
    prerequisites = models.ManyToManyField('self', symmetrical=False, blank=True)
    lecturers = models.ManyToManyField(get_user_model())
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Course")
        verbose_name_plural = ("Courses")

    def __str__(self):
        return self.name

    def save(self):
        if not self.pk:
            self.code = f'{self.department}-{self.code}'
            self.name = f'{self.name}-{self.semester}'
        return super().save()

class Request(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Request")
        verbose_name_plural = ("Requests")
        unique_together = ['user', 'course']

    def __str__(self):
        return f'{self.user.email}-{self.course.name}'