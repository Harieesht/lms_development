from django.urls import path
from api import views as api_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path("user/token/",api_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/',TokenRefreshView.as_view()),
    path('user/subject',api_views.get_subject),
    path('user/subject/<int:subject_id>',api_views.get_subject_detail),
    path('user/subject/chapter/<int:chapter_id>',api_views.get_chapter_detail), 
    path('user/password-reset',api_views.password_reset), 
    path('user/subject/chapterid/<int:chapter_id>',api_views.get_quiz_id),
    path('user/subject/quiz/<int:quiz_id>',api_views.get_quiz), 
    path('user/subject/quiz/evaluate/<int:quiz_id>',api_views.quiz_evaluate),
    path('user/subject/quiz/evaluate_progress/',api_views.chapter_quiz_evaluate),  
    path('user/subject/post_question/',api_views.post_question),
    path('user/subject/get_question/<int:subject_id>',api_views.get_questions), 
    path('user/subject/get_question_answer/<int:question_id>',api_views.get_question_answers), 
    path('user/subject/post_question_answer/',api_views.post_question_answers), 
    path('user/subject/student_quiz_status/<int:chapter_id>',api_views.student_quiz_status),
     
    
    
]

