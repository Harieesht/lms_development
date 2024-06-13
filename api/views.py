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
    
    if request.method=='GET':
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

@api_view(['GET'])
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
    
    old_password=request.data.get('old_password')
    new_password=request.data.get('new_password')
    
    user_password=user.check_password(old_password)
    
    if user_password is False:
        return Response({'message':"old password is not right....."},status=status.HTTP_401_UNAUTHORIZED)
    else:
        user.set_password(new_password)
        return Response({'message':'password has been changed'},status=status.HTTP_201_CREATED)
    

            
        

    
    

    
    
        
        
        
        
        
    

        
        
        
    
    






    
    

