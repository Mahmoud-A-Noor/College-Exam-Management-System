from django.contrib import admin
from .models import Course, Enrollment, ExamAttempt, ExamQuestion, Exam

admin.site.register(Course)
admin.site.register(ExamAttempt)
admin.site.register(ExamQuestion)
admin.site.register(Exam)
admin.site.register(Enrollment)