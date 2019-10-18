from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20) 
    # can use Pointfield to store location coordinates
    location_id = models.PositiveIntegerField()

    def __str__(self):
        return self.username

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    #each Question is related to a single user
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    author = models.CharField(max_length=20)
    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)
    location_id = models.PositiveIntegerField()
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ('publish_date_time',)