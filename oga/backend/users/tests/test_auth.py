from django.test import TestCase, Client
from django.contrib.auth import get_user_model
import json
# from django.contrib.auth import login, get_user


class AuthTest(TestCase):
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(username='test', password='1234')
        user.save()

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0

    def test_signup(self):
        userinfo = {'username': 'foo', 'password':'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 2)

    def test_signup_bad_request(self):
        userinfo = {'badreqeust': 'foo', 'password':'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin(self):
        userinfo = {'username': 'test', 'password':'1234'}
        response = self.client.post('/api/signin/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 1)

    def test_signin_no_user(self):
        userinfo = {'username': 'fake', 'password':'user'}
        response = self.client.post('/api/signin/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 401)
