"""wrapper for recombee"""
import json
from ..models import Location
from background_task import background
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.exceptions import APIException
from recombee_api_client.api_requests import AddPurchase, RecommendItemsToItem
from recombee_api_client.api_requests import Batch, SetItemValues, ResetDatabase
from recombee_api_client.api_requests import AddItemProperty

DB_NAME = 'askat-dev' 
API_KEY = 'LJ1SuCdQQsu2GnNt0eiQVOcT3kRK2nhDv8boWWdsTyheJSRMTWCbjfClmXfNy6nq'
client = RecombeeClient(DB_NAME, API_KEY)

@background
def get_recommendation(user, location):
    recommended = client.send(RecommendItemsToItem(location, user, 2))
    return recommended

@background
def add_item(user, location):
    loc=Location.objects.get(pk=location)
    request = []
    request.append(SetItemValues(location,
                                 {'lat': loc.latitude,
                                  'lng': loc.longitude},
                                 cascade_create=True))
    request.append(AddPurchase(user, location, cascade_create=True))
    client.send(Batch(request))

    recommended = client.send(RecommendItemsToItem(location, user, 2))
    for loc in recommended['recomms']:
        location = Location.objects.get(pk=loc['id'])
        print(location.name)
    print("done")
