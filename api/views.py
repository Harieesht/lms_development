from rest_framework_simplejwt.views import TokenObtainPairView
from api import serializers as api_serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
from .models import  *
from users.models import *


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=api_serializers.MyTokenObtainSerializer
    
    
    
def authenticate(request):  #Authenticating the token only if they are students
    
    if request.method=='GET' or request.method=='POST':
        token=request.headers.get('Authorization',None)
        
        if token==None:
            return {'message':"jwt token is missing...","status":status.HTTP_401_UNAUTHORIZED}
        
        scheme,token=token.split(" ")
        
        if scheme!='Bearer':
            return {'message':"Wrong Scheme....","status":status.HTTP_400_BAD_REQUEST}
        try:
            decoded_token=jwt.decode(token,settings.SECRET_KEY,["HS256"])
        except jwt.InvalidTokenError:
            return {'message':"Invalid Token","status":status.HTTP_401_UNAUTHORIZED}
        
        return decoded_token
    
@api_view(['GET'])
def get_subject(request):

        decoded_token=authenticate(request)
        if decoded_token.get('message'):
            message=decoded_token.get('message')
            message_status=decoded_token.get('status')
            return Response({'message':message},status=message_status)
        
        college_name=decoded_token['college']
        program_name=decoded_token['program']
        user_id=decoded_token['user_id']
        user=User.objects.get(user_id=user_id)
        
        context={'user':user}
        program=Program.objects.get(college__name=college_name,name=program_name)
        
        subjects=Subject.objects.filter(program=program)
        
        subjectserializer = api_serializers.SubjectSerializer(subjects,many=True,context=context)
        
        return Response({'subjects':subjectserializer.data},status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_subject_detail(request,subject_id):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    subject=Subject.objects.get(id=subject_id)
    
    chapters=Chapter.objects.filter(subject=subject)
    
    chapterserializer=api_serializers.ChapterSerializer(chapters,many=True)
    
    return Response(chapterserializer.data,status=status.HTTP_200_OK)

def get_chapter_detail(request,chapter_id):
    
    decoded_token=authenticate(request)
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    chapter=Chapter.objects.get(id=chapter_id)
   
    chapteritems=ChapterItem.objects.filter(chapter=chapter)
    
    chapteritemsserializer=api_serializers.ChapterItemSerializer(chapteritems,many=True)
    
    return Response({'chapteritems':chapteritemsserializer.data},status=status.HTTP_200_OK)  
    
 
@api_view(['GET','POST'])
def password_reset(request):

    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    user_id=decoded_token.get('user_id')
    
    user=User.objects.get(user_id=user_id)
    if user is None:
        return Response({'message':"this user doesnt exist..."},status=status.HTTP_404_NOT_FOUND)
    
    old_password=request.data.get('currentPassword')
    new_password=request.data.get('newPassword')
    
    user_password=user.check_password(old_password)
    
    if user_password is False:
        return Response({'message':"current password is not right....."},status=status.HTTP_401_UNAUTHORIZED)
    else:
        user.password=new_password
        user.save()
        return Response({'message':'password has been changed'},status=status.HTTP_201_CREATED)
        

    
@api_view(['GET'])
def get_quiz_id(request,chapter_id):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    user_id=decoded_token.get('user_id')
    
    chapterquizes=ChapterQuiz.objects.filter(chapter__id=chapter_id).order_by('?')
    
    chapterquizid=[quiz.id for quiz in chapterquizes]
    return Response({'chapterquizid':chapterquizid},status=status.HTTP_201_CREATED)

@api_view(['GET']) 
def get_quiz(request,quiz_id):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    try:
        chapterquiz=ChapterQuiz.objects.get(id=quiz_id)
    except ChapterQuiz.DoesNotExist:
        return Response({'message': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    
    chapterquizserializer=api_serializers.ChapterQuizSerializer(chapterquiz)
    print(chapterquizserializer.data)
    return Response(data=chapterquizserializer.data,status=status.HTTP_200_OK) 
 
@api_view(['POST'])
def quiz_evaluate(request,quiz_id):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    selected_option=request.data.get('selected_option')
    quizanswer=ChapterQuiz.objects.get(id=quiz_id).correct_answer
    print(quizanswer)
    print(selected_option)
    
    if quizanswer == selected_option:
        is_correct=True
    else:
        is_correct=False
        
    
    user_id=decoded_token.get('user_id')
    
    try:
        quizanswerexist=StudentChapterQuizAnswer.objects.filter(chapterquiz_id=quiz_id,student_id=user_id).exists()
        print(quizanswerexist)
        if quizanswerexist:
            
            studentquizanswer=StudentChapterQuizAnswer.objects.get(chapterquiz_id=quiz_id,student_id=user_id)
            studentquizanswer.is_correct=is_correct
            studentquizanswer.save()
            return Response({'message':'student answer is saved'},status=status.HTTP_201_CREATED)
        else:
           
           studentquizanswer = StudentChapterQuizAnswer.objects.create(chapterquiz_id=quiz_id,student_id=user_id,is_correct=is_correct)
           studentquizanswer.save()
           return Response({'message':'student answer is saved'},status=status.HTTP_201_CREATED)
           
    except StudentChapterQuizAnswer.DoesNotExist :
        return Response({'error':"error"})

@api_view(['POST'])   
def chapter_quiz_evaluate(request):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    user_id=decoded_token.get('user_id')
    chapter_id=request.data.get('chapter_id')
    
    chapterquizes=ChapterQuiz.objects.filter(chapter_id=chapter_id)
    
    chapterquizcount=chapterquizes.count()
    print(chapterquizcount)
    studentchapterquizanswercorrectcount=StudentChapterQuizAnswer.objects.filter(chapter_id=chapter_id,is_correct=True).count()
    print(studentchapterquizanswercorrectcount)
    
    progress=(studentchapterquizanswercorrectcount/chapterquizcount)*100
    
    studentchapterprogressexists=StudentChapterQuizProgressPercent.objects.filter(chapter_id=chapter_id,student_id=user_id).exists()
    
    if studentchapterprogressexists:
        
        studentchapterprogress=StudentChapterQuizProgressPercent.objects.get(chapter_id=chapter_id,student_id=user_id)
        studentchapterprogress.progress=progress
        studentchapterprogress.save() 
    else:
        studentchapterprogress=StudentChapterQuizProgressPercent.objects.create(chapter_id=chapter_id,student_id=user_id,progress=progress)
        studentchapterprogress.save() 
        
    
    return Response({'message':'Progress have been saved','progress':studentchapterprogress.progress},status=status.HTTP_201_CREATED) 

@api_view(['POST'])
def post_question(request):
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    user_id=decoded_token.get('user_id')
    
    print(user_id)
    
    title=request.data.get("title")
    question=request.data.get("question")
    subject_id=request.data.get('subject_id')
    try:
        subjectquestion=SubjectQuestion.objects.create(student_id=user_id,subject_id=subject_id,title=title,question=question)
        subjectquestion.save()
        return Response({'message:question is saved'},status=status.HTTP_201_CREATED)
    except SubjectQuestion.DoesNotExist:
        return Response({'message':'question is not saved'},status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_questions(request,subject_id):
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    try:
        subjectquestions=SubjectQuestion.objects.filter(subject_id=subject_id)
        print(subjectquestions)
    except SubjectQuestion.DoesNotExist:
        return Response({'message':"Questions not found"},status=status.HTTP_404_NOT_FOUND)
       
    subjectquestionserailizer=api_serializers.SubjectQuestionSerializer(subjectquestions,many=True)
    return Response({'questions':subjectquestionserailizer.data},status=status.HTTP_200_OK) 

@api_view(['GET'])
def get_question_answers(request,question_id):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    try:
        questionanswer=QuestionAnswers.objects.filter(subjectquestion_id=question_id)
        print(questionanswer)
    except QuestionAnswers.DoesNotExist:
        return Response({'message':"No Post is Found"},status=status.HTTP_404_NOT_FOUND)
    
    questionanswersserializers=api_serializers.QuestionAnswerSerializer(questionanswer,many=True)
    return Response({'answers':questionanswersserializers.data},status=status.HTTP_200_OK)
        
@api_view(['POST'])
def post_question_answers(request):
    
    decoded_token=authenticate(request)
    
    if decoded_token.get('message'):
        message=decoded_token.get('message')
        message_status=decoded_token.get('status')
        return Response({'message':message},status=message_status)
    
    question_id=request.data.get('question_id')
    answer=request.data.get('answer')
    
    
    questionanswer=QuestionAnswers.objects.create(subjectquestion_id=question_id,answer=answer)
    questionanswer.save()
    
    return Response({'message':'post have been saved'},status=status.HTTP_201_CREATED)
    
    
    
        
        
        
        
        
    

        
        
        
    
    






    
    

