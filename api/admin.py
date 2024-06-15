#Entire admin configuration is here

from django.contrib import admin
from .models import *
from users.models import User,Teacher,Student

class ProgramAdmin(admin.ModelAdmin):
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            # Filter the queryset based on the users college(users)
            if hasattr(self.model, 'student'):
                kwargs["queryset"] = Student.objects.filter(user__college=request.user.college) 
        return super().formfield_for_manytomany(db_field, request, **kwargs)
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):   
        if request.user.user_type == 'admin': 
            if hasattr(self.model, 'college'):
                # Filter the queryset based on the user's college(college)
                kwargs["queryset"] = College.objects.filter(name=request.user.college.name)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.user_type == 'admin':
            if hasattr(self.model, 'college'):
                queryset = queryset.filter(college=request.user.college)
        return queryset

class SubjectAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            if hasattr(self.model, 'program') and db_field.name == 'program':
                # Filter the queryset based on the user's program
                kwargs["queryset"] = Program.objects.filter(college=request.user.college)
            if hasattr(self.model, 'teacher') and db_field.name == 'teacher':
                # Filter the queryset based on the user's college and user_type='teacher'
                kwargs["queryset"] = Teacher.objects.filter(user__college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.user_type == 'teacher':
            if hasattr(self.model, 'teacher'):
                teacher=Teacher.objects.get(user=request.user)
                queryset = queryset.filter(teacher=teacher)
        return queryset

class ChapterAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            # Filter the queryset based on the user's college
            if hasattr(self.model, 'chapter'):
                kwargs["queryset"] = Chapter.objects.filter(college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.user_type == 'admin':
            if hasattr(self.model, 'college'):
                queryset = queryset.filter(college=request.user.college)
        return queryset


class ChapterItemAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            # Filter the queryset based on the user's college
            if hasattr(self.model, 'subject'):
                kwargs["queryset"] = Subject.objects.filter(college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(College)
admin.site.register(Program, ProgramAdmin)
admin.site.register(Subject,SubjectAdmin)
admin.site.register(Chapter,ChapterAdmin)
admin.site.register(ChapterItem,ChapterItemAdmin)
admin.site.register(SubjectProgress)
admin.site.register(ChapterQuiz)
# admin.site.register(ChapterQuizAnswer)








































































































































