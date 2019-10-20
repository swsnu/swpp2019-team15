# Generated by Django 2.2.6 on 2019-10-18 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20191019_0006'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='user',
            new_name='author',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='location_id',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='user',
        ),
        migrations.AlterField(
            model_name='answer',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.User'),
        ),
    ]