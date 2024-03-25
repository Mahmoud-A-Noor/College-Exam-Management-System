from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator


YEAR_CHOICES = (
    (1, '1st year'),
    (2, '2nd year'),
    (3, '3rd year'),
    (4, '4th year'),
)

class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    content = models.CharField(max_length=1000, null=True, blank=True)
    lecturer = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="courses_taught")
    final_percentage = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    year = models.IntegerField(choices=YEAR_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def students(self):
        return self.enrollments.values_list('user', flat=True)

    class Meta:
        verbose_name = ("Course")
        verbose_name_plural = ("Courses")

    def __str__(self):
        return self.name

ENROLLMENT_STATUS = (
    (1, 'Pending'),
    (2, 'Failed'),
    (3, 'Success'),
)

class Enrollment(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    score = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(100.0)], null=True, blank=True)
    status = models.IntegerField(choices=ENROLLMENT_STATUS, default=1)
    enrollment_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course') 

    def __str__(self):
        return f"{self.user} enrolled in {self.course} on {self.enrollment_date}"
    

class Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_final = models.BooleanField(default=False)
    exam_datetime = models.DateTimeField(default=timezone.now)
    num_questions = models.IntegerField(default=0)
    total_degree = models.IntegerField(default=0)
    duration = models.IntegerField(default=0)  # Duration of the exam in minutes

    class Meta:
        verbose_name = ("Exam")
        verbose_name_plural = ("Exams")

    def __str__(self):
        return f"{self.course.name} - {self.exam_datetime}"
    
    
class ExamQuestion(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    header = models.CharField(max_length=255)
    isMCQ = models.BooleanField(default=False)
    trueAnswer = models.CharField(max_length=255)
    falseAnswers = models.JSONField()  # Store false answers as a JSON array

    def __str__(self):
        return self.header
    

class ExamAttempt(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    score = models.FloatField(null=True, blank=True)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = ("Exam Attempt")
        verbose_name_plural = ("Exam Attempts")
        unique_together = (('exam', 'student'),)

    def __str__(self):
        return f"{self.student.email} - {self.exam.course}"

    def duration(self):
        if self.end_time and self.start_time:
            return (self.end_time - self.start_time).seconds // 60  # Duration in minutes
        else:
            return None