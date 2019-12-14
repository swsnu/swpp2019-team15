"""wrapper for recombee"""
from recombee_api_client.api_client import RecombeeClient
# from recombee_api_client.exceptions import APIException
from recombee_api_client.api_requests import AddPurchase, RecommendItemsToItem
from recombee_api_client.api_requests import Batch, SetItemValues
from background_task import background
from django.core.cache import cache
from ..models import Location

DB_NAME = 'askat-dev'
API_KEY = 'LJ1SuCdQQsu2GnNt0eiQVOcT3kRK2nhDv8boWWdsTyheJSRMTWCbjfClmXfNy6nq'
CLIENT = RecombeeClient(DB_NAME, API_KEY)


def get_recommendation(user, location):
    """ retrieve result from cache """
    ret = cache.get(user + location, ["No recommendation"])
    print(ret)
    return ret


@background
def add_item(user, location):
    """async add item to the recommbee DB"""
    print("I am adding")
    loc = Location.objects.get(pk=location)
    request = []
    request.append(SetItemValues(location,
                                 {'lat': loc.latitude,
                                  'lng': loc.longitude},
                                 cascade_create=True))
    request.append(AddPurchase(user, location, cascade_create=True))
    CLIENT.send(Batch(request))
    _get_recommendation(user, location)


def _get_recommendation(user, location):
    """store list of recommendation in cache"""
    recommended = CLIENT.send(RecommendItemsToItem(location, user, 2))
    location_names = []
    for loc in recommended['recomms']:
        location = Location.objects.get(pk=loc['id'])
        location_names.append(location.name)
    # user and the location id is the key
    cache.set(user + location, location_names, 15 * 60)
    # return location_names
