# Generated by Django 4.2.13 on 2024-06-19 05:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_studentchapterquizanswer_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentchapterquizanswer',
            old_name='subjectquiz',
            new_name='chapterquiz',
        ),
        migrations.RemoveField(
            model_name='studentchapterquizprogresspercent',
            name='chapterquiz',
        ),
        migrations.AddField(
            model_name='studentchapterquizanswer',
            name='chapter',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, to='api.chapter'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='chapteritem',
            name='video',
            field=models.FileField(default='https://www.youtube.com/watch?v=SqcY0GlETPk', upload_to='path-to-upload'),
        ),
    ]
