from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=100)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20) 
    # can use Pointfield to store location coordinates
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE,
            blank=True, null=True)

    def __str__(self):
        return self.username

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    #each Question is related to a single user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ('publish_date_time',)

class Answer(models.Model):
    #each Answer is related to a single question
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)
    
    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ('publish_date_time',)