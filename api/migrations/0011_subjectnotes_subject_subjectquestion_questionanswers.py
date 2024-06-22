# Generated by Django 4.2.13 on 2024-06-20 07:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_name_alter_user_username'),
        ('api', '0010_studentchapterquizanswer_chapter'),
    ]

    operations = [
        migrations.AddField(
            model_name='subjectnotes',
            name='subject',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.subject'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='SubjectQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subject')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionAnswers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField()),
                ('subjectquestion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subjectquestion')),
            ],
        ),
    ]
