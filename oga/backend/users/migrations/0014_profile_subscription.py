# Generated by Django 2.2.5 on 2019-10-31 05:59

from django.db import migrations
import users.custommodels.json_field


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20191025_1648'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='subscription',
            field=users.custommodels.json_field.JSONField(blank=True, null=True),
        ),
    ]
