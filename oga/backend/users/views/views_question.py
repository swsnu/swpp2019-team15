"""functional views api for the models"""
import json

from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from ..models import Question, Location, Answer
from ..utils.recommender import get_recommendation
from ..views.decorators import check_request, check_login_required


# @check_login_required
@check_request
@require_http_methods(["POST", "GET"])
def questions(request):
    """api wrapper of POST and GET methods"""
    if request.method == 'POST':
        # create new question
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
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
        user = get_user(request)
        # get list of most 100 most recent questions
        question_list = Question.objects.filter()[:100]
        response_dict = parse_question_list(question_list)
        return JsonResponse(response_dict, safe=False)


@check_login_required
@check_request
@require_http_methods(["GET"])
def get_user_questions(request, username=''):
    """ get list of questions posted by user """
    if username == '':
        # get list of questions made by currently logged in user
        user = get_user(request)
    else:
        user = User.objects.get(username=username)

    question_list = Question.objects.filter(author=user)
    response_dict = parse_question_list(question_list)

    return JsonResponse(response_dict, safe=False)


@check_login_required
@check_request
@require_http_methods(["GET"])
def question_recommendation(request, question_id):
    """
    function to get recommendations for given question
    GET: question_recommendation api
    """
    user = get_user(request)
    question = Question.objects.get(id=question_id)
    location = question.location_id
    try:
        recommendation_list = get_recommendation(user.username, location.id)
    except Exception as e:
        print(e)
    return JsonResponse(recommendation_list, status=201, safe=False)


def parse_question_list(question_list):
    """
    Single function to parse given question list
    and into an appropriate Json response_dict
    """
    response_dict = [{
        'id': question.id,
        'author': question.author.username,
        'publish_date_time': question.publish_date_time,
        'content': question.content,
        'location': question.location_id.name,
        'is_answered': question.is_answered,
        'answer_count': Answer.objects.filter(question=question).count(),
        'follow_count': question.follow_count
    } for question in question_list]

    return response_dict


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
        'location': location.name,
        'target_location_name': location.name,
        'place_lat': location.latitude,
        'place_lng': location.longitude,
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

    if question not in profile.follows.all():
        profile.follows.add(question)
        question.follow_count += 1
        question.save()
        return JsonResponse({}, status=201)

    else:
        return JsonResponse({}, status=400)
