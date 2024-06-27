"""Models for College, Program, Subject, and Chapter."""

from django.db import models
from users.models import Teacher, Student
from random import randint


class College(models.Model):
    """Model representing a college."""

    NAME_CHOICES = [
        ("Vels University", "Vels University"),
        ("Crescent", "Crescent"),
        ("Jamal Mohamad", "Jamal Mohamad"),
        ("Malla Reddy", "Malla Reddy"),
    ]

    name = models.CharField(max_length=100, choices=NAME_CHOICES)

    def __str__(self):
        """String representation of the college."""
        return self.name


class Program(models.Model):
    """Model representing a program."""
    SEMESTER=[
        (x,x) for x in range(1,9)
    ]
    YEAR=[
        (x,x) for x in range(1,5)
    ]

    college = models.ForeignKey(College, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    semester=models.IntegerField(choices=SEMESTER,default=1)
    year = models.SmallIntegerField(
        choices=YEAR, default=1
    )
    # student = models.ManyToManyField(Student, related_name='programs')

    def __str__(self):
        """String representation of the program."""
        return f"{self.name}-{self.college}-sem{self.semester}"


class Subject(models.Model):
    """Model representing a Subject."""
    img=models.ImageField(upload_to='path-to-upload')
    title = models.CharField(max_length=300)
    description=models.TextField()
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    program = models.ForeignKey(Program, on_delete=models.PROTECT)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)
    

    def save(self, *args, **kwargs):
        """Override the save method to set the college based on the program."""
        self.college = self.program.college
        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the Subject."""
        return self.title


class Chapter(models.Model):
    """Model representing a Chapter."""
    
    name=models.CharField(max_length=200)
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)
    description = models.TextField()
    

    def save(self, *args, **kwargs):
        """Override the save method to set the college based on the Subject."""
        self.college = self.subject.college
        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the Chapter."""
        return f"{self.name}-{self.id}"

class ChapterItem(models.Model):
    
    description=models.TextField()
    chapter=models.ForeignKey(Chapter,on_delete=models.PROTECT,related_name='items')
    ppt=models.FileField(upload_to='path-to-upload')
    video=models.FileField(upload_to='path-to-upload',default='https://www.youtube.com/watch?v=SqcY0GlETPk')
    
    def _str_(self):
        return f"{self.chapter}-item{self.id}"
    

class SubjectProgress(models.Model):
    subject=models.ForeignKey(Subject,on_delete=models.PROTECT)
    student=models.ForeignKey(Student,on_delete=models.PROTECT,related_name='progress')
    progress=models.PositiveSmallIntegerField()
    completed=models.BooleanField(default=False)
    
    def save(self,args,*kwargs):
        if self.progress==100:
            self.completed=True
        super().save(args,*kwargs)

    
class ChapterQuiz(models.Model):
    
    answer=[
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D'),
    ]
    
    chapter=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    question=models.CharField(max_length=200)
    choice_a=models.CharField(max_length=200)
    choice_b=models.CharField(max_length=200)
    choice_c=models.CharField(max_length=200)
    choice_d=models.CharField(max_length=200)
    correct_answer=models.CharField(max_length=1,choices=answer)
    active=models.BooleanField(default=True)
    

class StudentChapterQuizAnswer(models.Model):
    
    chapterquiz=models.ForeignKey(ChapterQuiz,on_delete=models.CASCADE)
    chapter=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    is_correct=models.BooleanField(default=False)
    
    def save(self,*args,**kwargs):
        self.chapter=self.chapterquiz.chapter
        super().save(*args,**kwargs)
    
    
class StudentChapterQuizProgressPercent(models.Model):
    
    chapter=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    # chapterquiz=models.ForeignKey(ChapterQuiz,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    progress=models.IntegerField()
    
    
    def quiz_count(self):
        quizes=ChapterQuiz.objects.filter(chapter=self.chapter)
        return quizes.count()
        
    def correct_answer_count(self):
        studentchapterquizanswer=StudentChapterQuizAnswer.objects.filter(is_correct=True,student=self.student,chapter=self.chapter)
        return studentchapterquizanswer.count()
    
    def calculate_pass_percentage(self):
        quiz_count=self.quiz_count()
        correct_answer_count=self.correct_answer_count()
        
        return (correct_answer_count/quiz_count)*100
        
class StudentChapterQuizAttended(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    chapter=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    attended=models.BooleanField(default=False)
    blocked=models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.student.name}-{self.chapter.name}"
    
class SubjectQuestion(models.Model):
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE) 
    title=models.CharField(max_length=100)
    question=models.TextField()
    
    
    def __str__(self):
        return f"{self.student.name}-{self.subject.title}-{self.id}question"
    
class QuestionAnswers(models.Model):
    subjectquestion=models.ForeignKey(SubjectQuestion,on_delete=models.CASCADE)
    
    answer=models.TextField()
    
    def __str__(self):
        return f"{self.subjectquestion}-answer"