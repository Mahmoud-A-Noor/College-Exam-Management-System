from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    content = models.CharField(max_length=1000, null=True, blank=True)
    lecturer = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="courses_taught")
    final_percentage = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


    @property
    def students(self):
        return self.request_set.values_list('user', flat=True)

    class Meta:
        verbose_name = ("Course")
        verbose_name_plural = ("Courses")

    def __str__(self):
        return self.name


class Request(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    score = models.FloatField(null=True, blank=True)  # Score specific to each student-course combination
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Request")
        verbose_name_plural = ("Requests")
        unique_together = ['user', 'course']

    def __str__(self):
        return f'{self.user.email}-{self.course.name}'
    

class Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now)
    duration_minutes = models.IntegerField(default=60)  # Duration of the exam in minutes

    class Meta:
        verbose_name = ("Exam")
        verbose_name_plural = ("Exams")

    def __str__(self):
        return f"{self.name} - {self.course.name}"