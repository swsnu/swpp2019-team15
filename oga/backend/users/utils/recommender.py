"""wrapper for recombee"""
from recombee_api_client.api_client import RecombeeClient
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
    ret = cache.get(user + str(location), ["No recommendations so far"])
    return ret

@background
def add_item(user, location):
    """async add item to the recommbee DB"""

    # call this to prepare the cache
    _get_recommendation(user, location)

    loc = Location.objects.get(pk=location)
    request = []
    request.append(SetItemValues(location,
                                 {'lat': loc.latitude,
                                  'lng': loc.longitude},
                                 cascade_create=True))
    request.append(AddPurchase(user, location, cascade_create=True))
    CLIENT.send(Batch(request))

def _get_recommendation(user, locationid):
    """store list of recommendation in cache"""
    recommended = CLIENT.send(RecommendItemsToItem(locationid, user, 2))
    location_names = []
    for loc in recommended['recomms']:
        location = Location.objects.get(pk=loc['id'])
        location_names.append(location.name)
    # user and the location id is the key
    cache.set(user + str(locationid), location_names, 15 * 60)
