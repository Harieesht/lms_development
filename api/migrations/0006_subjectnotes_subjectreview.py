# Generated by Django 4.2.13 on 2024-06-09 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_chapteritem_chapter'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubjectNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SubjectReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('star', models.SmallIntegerField()),
                ('review', models.TextField()),
            ],
        ),
    ]
