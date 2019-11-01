"""functional views api for the models"""
import json

# from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.models import Question, Location
from users.views.decorators import check_request, check_login_required

@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def questions(request):
    """questions api"""
    req_data = json.loads(request.body.decode())
    location = req_data['target_location']
    content = req_data['content']
    user = get_user(request)

    location, _ = Location.objects.get_or_create(name=location['name'],
                                                 latitude=location['latitude'],
                                                 longitude=location['longitude'])

    question = Question(author=user, location_id=location,
                        content=content)
    question.save()
    response_dict = {'id': question.id}
    return JsonResponse(response_dict, status=201)

@check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
def get_question(request, question_id):
    """question api"""
    req_data = json.loads(request.body.decode())
    question = Question.objects.get(id=question_id)
    response_dict = {'id': question.id,
                     'question_type': question.question_type,
                     'location': {question.location_id.longitude, question.location_id.latitude},
                     'content': question.content}
    return JsonResponse(response_dict, state=200)