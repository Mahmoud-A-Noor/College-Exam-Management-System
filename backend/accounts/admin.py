from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = (
        'email',
        'first_name',
        'last_name',
        'user_type',
        'is_active',
        'is_staff',
    )

    list_filter = (
        'user_type',
        'is_active',
        'is_staff',
    )

    filter_horizontal = []

    ordering = ('email',)

    fieldsets = [
        ('Account Info', {
            'fields': (
                'email',
                'password'
            ),
        }),
        ('Personal Info', {
            'fields': (
                'first_name',
                'last_name',
                'gender',
                'date_of_birth',
                'address',
                'phone_number'
            )
        }),
        ('System Related Info', {
            'fields': (
                'user_type',
                'img',
                'date_joined',
                'is_active',
                'is_staff'
            )
        })
    ]

    add_fieldsets = [
        (
            None, 
            {
                'fields': (
                    'email',
                    'first_name',
                    'last_name',
                    'gender',
                    'user_type',
                    'password1',
                    'password2',
                )
            }
        )
    ]

admin.site.register(CustomUser, CustomUserAdmin)