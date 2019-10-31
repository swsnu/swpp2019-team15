""""""
import json
from pywebpush import webpush, WebPushException

def send_push(subscription, body):
    """
    given a subscription of a user (a json object),
    send an appropriate notification with body (a dictionary object) notification

    how to use:
    send_push(subscription, {'title': 'hi', 'text': 'hi'})
    """
    try:
        webpush(subscription,
                json.dumps(body),
                # encoded as a hard string as of now
                vapid_private_key="LhJWR3cBwqckwjYMC1vQoCLXmI8d3qXK6LOUMZ-6LzY",
                vapid_claims={"sub": "mailto:indiofish@naver.com"})
    except WebPushException as ex:
        print(": {}", repr(ex))
        # Mozilla returns additional information in the body of the response.
        if ex.response and ex.response.json():
            extra = ex.response.json()
            print("Remote service replied with a {}:{}, {}",
                  extra.code,
                  extra.errno,
                  extra.message)
