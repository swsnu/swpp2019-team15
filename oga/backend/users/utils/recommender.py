"""wrapper for recombee"""
from recombee_api_client.api_client import RecombeeClient
# from recombee_api_client.exceptions import APIException
from recombee_api_client.api_requests import AddPurchase, RecommendItemsToItem
from recombee_api_client.api_requests import Batch, SetItemValues
from background_task import background
from ..models import Location

DB_NAME = 'askat-dev'
API_KEY = 'LJ1SuCdQQsu2GnNt0eiQVOcT3kRK2nhDv8boWWdsTyheJSRMTWCbjfClmXfNy6nq'
CLIENT = RecombeeClient(DB_NAME, API_KEY)

def get_recommendation(user, location):
    """return list of recommended place's names"""
    recommended = CLIENT.send(RecommendItemsToItem(location, user, 2))
    location_names = []
    for loc in recommended['recomms']:
        location = Location.objects.get(pk=loc['id'])
        location_names.append(location.name)
    return location_names

@background
def add_item(user, location):
    """async add item to the recommbee DB"""
    loc = Location.objects.get(pk=location)
    request = []
    request.append(SetItemValues(location,
                                 {'lat': loc.latitude,
                                  'lng': loc.longitude},
                                 cascade_create=True))
    request.append(AddPurchase(user, location, cascade_create=True))
    CLIENT.send(Batch(request))
