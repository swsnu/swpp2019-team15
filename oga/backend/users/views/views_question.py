"""functional views api for the models"""
import json

from django.http import JsonResponse
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from users.models import Question, Location
from users.views.decorators import check_request, check_login_required


@check_login_required
@check_request
@require_http_methods(["POST", "GET"])
def questions(request):
    """api wrapper of POST and GET methods"""
    if request.method == 'POST':
        # create new question
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
        response_dict = {'id': question.id,
                         'author_id': user.id,
                         'content': question.content,
                         'target_location': location.name}
        return JsonResponse(response_dict, status=201)

    else:
        # get question list
        question_list = Question.objects.filter()
        response_dict = [{
            'id': question.id,
            'author': question.author.username,
            'publish_date_time': question.publish_date_time,
            'content': question.content,
            'location': question.location_id.name,
            'is_answered': question.is_answered,
        } for question in question_list]
        return JsonResponse(response_dict, safe=False)


@check_login_required
@check_request
@require_http_methods(["GET"])
def get_user_questions(request):
    """ get list of questions posted by user """
    user = get_user(request)
    question_list = Question.objects.filter(author=user)
    response_dict = [{
        'id': question.id,
        'author': question.author.username,
        'publish_date_time': question.publish_date_time,
        'content': question.content,
        'location': question.location_id.name,
        'is_answered': question.is_answered,
    } for question in question_list]
    return JsonResponse(response_dict, safe=False)


@check_login_required
@check_request
@require_http_methods(["GET"])
def get_single_user_questions(request, username):
    """ get list of questions posted by specific user with given username """
    user = User.objects.get(username=username)
    question_list = Question.objects.filter(author=user)
    response_dict = [{
        'id': question.id,
        'author': question.author.username,
        'publish_date_time': question.publish_date_time,
        'content': question.content,
        'location': question.location_id.name,
        'is_answered': question.is_answered,
    } for question in question_list]
    return JsonResponse(response_dict, safe=False)


@check_login_required
@check_request
@require_http_methods(["GET"])
def question_detail(request, question_id):
    """ get single question with given id """
    question = get_object_or_404(Question, id=question_id)
    location = question.location_id
    response_dict = {
        'id': question.id,
        'author': question.author.username,
        'publish_date_time': question.publish_date_time,
        'content': question.content,
        'location': question.location_id.name,
        'target_location_name': location.name,
        'place_lat': question.location_id.latitude,
        'place_lng': question.location_id.longitude,
        'is_answered': question.is_answered,
    }
    return JsonResponse(response_dict)


@check_login_required
@check_request
@require_http_methods(["GET"])
def follow_question(request, question_id):
    """ get single question with given id """
    question = get_object_or_404(Question, pk=question_id)
    profile = request.user.profile

    profile.follows.add(question)

    return JsonResponse({}, status=201)
