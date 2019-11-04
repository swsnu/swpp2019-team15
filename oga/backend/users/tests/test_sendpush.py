from pywebpush import WebPushException
from unittest.mock import Mock, patch
from django.test import TestCase
from users.utils.send_push import send_push

def throw_error(x,y,vapid_private_key,vapid_claims):
    raise WebPushException("error")

def throw_my_error(x,y,vapid_private_key,vapid_claims):
    extra = Mock()
    extra.code = 1
    extra.errno = 3
    extra.message = "HI"
    m = Mock()
    m.json.return_value = extra
    raise WebPushException("error", response=m)


class SendPushTestCase(TestCase):
    """ tests regarding notification api """

    m = Mock()
    m.profile = {}

    @patch('users.utils.send_push.webpush')
    def test_send_push(self, f):
        """webpush is called"""
        send_push(self.m, {"text": "HI"})
        f.assert_called_once()

    @patch('users.utils.send_push.webpush', side_effect=throw_error)
    def test_error_in_send_push(self, f):
        """webpush is called"""
        self.assertRaises(WebPushException, send_push(self.m, {"text":"HI"}))

    @patch('users.utils.send_push.webpush', side_effect=throw_my_error)
    def test_more_error_in_send_push(self, f):
        """webpush is called"""
        self.assertRaises(WebPushException, send_push(self.m, {"text":"HI"}))
