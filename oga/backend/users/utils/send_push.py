"""wrapper for webpush"""
import json
from pywebpush import webpush, WebPushException
from users.models import Location
from math import radians, cos, sin, asin, sqrt

# haversine formula
# from https://stackoverflow.com/questions/4913349/haversine-formula-in-python-bearing-and-distance-between-two-gps-points
def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r

def check_sender_near_receiver(qs_loc, rc_loc):
    distance = haversine(qs_loc.longitude, qs_loc.latitude, rc_loc.longitude, rc_loc.latitude)
    # return true if distance from question location and receiver's location is lower than 300m
    return (distance < 0.3)

def send_push(question_location_id, profile, body):
    """
    given a subscription of a user (a Profile)
    send an appropriate notification with body (a dictionary object) notification

    how to use:
    send_push(profile, {'title': 'hi', 'text': 'hi'})
    """
    try:
        question_location = Location.objects.get(id=question_location_id)
        receiver_location = Location.objects.get(id=profile.location_id)
        if check_sender_near_receiver(question_location, receiver_location):
            webpush(profile.subscription,
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
