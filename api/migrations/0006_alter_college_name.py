# Generated by Django 4.2.13 on 2024-05-20 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_students_course_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='college',
            name='name',
            field=models.CharField(choices=[('Vels University', 'Vels University'), ('Crescent', 'Crescent'), ('Jamal Mohamad', 'Jamal Mohamad'), ('Malla Reddy', 'Malla Reddy')], max_length=100),
        ),
    ]
