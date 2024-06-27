from django.contrib import admin
from .models import User as CustomUser,Student,Teacher


class StudentAdmin(admin.ModelAdmin):
    list_display = ['name','program']
    


admin.site.register(Teacher)
admin.site.register(CustomUser)
admin.site.register(Student,StudentAdmin)
