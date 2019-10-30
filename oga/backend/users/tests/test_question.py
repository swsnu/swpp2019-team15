from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from ..models import Location, Profile, Question
import json
# from django.contrib.auth import login, get_user


class QuestionTestCase(TestCase):
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(username='test', password='1234')
        user.save()
        location = Location.objects.create(name='home',
                                           longitude=38.123,
                                           latitude=127.39)
        location.save()
        question = Question.objects.create(author=user, content='rains?',
                                           location_id=location)
        question.save()
        profile = Profile.objects.get(user=user)
        profile.location = location

        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_add_questions(self):
        location = {'name':'school', 'longitude':27.123, 'latitude':23.234}
        question_data = {'target_location': location,
                         'content': 'raining??'}
        response = self.client.post('/api/questions/', 
                                    json.dumps(question_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 2)