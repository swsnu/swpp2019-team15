# Generated by Django 2.2.5 on 2019-12-08 05:06

from django.db import migrations
import users.custommodels.json_field


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_auto_20191207_2255'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='rated_answers_list',
            field=users.custommodels.json_field.JSONField(blank=True, null=True),
        ),
    ]
