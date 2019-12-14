"""functional views api for the models"""
import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from ..utils.recommender import get_recommendation
from users.models import Question, Answer, Profile
from users.views.decorators import check_request, check_login_required


# @check_login_required
@check_request
@require_http_methods(["GET", "POST"])
@csrf_exempt
def get_or_create_answer(request, question_or_answer_id):
    """
    function to post an answer of given question_id
    or get an answer with given answer_id
    POST: create_answer api
    GET: get_answers api
    """
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        req_data = json.loads(request.body.decode())
        question_type = req_data['question_type']
        answer_author = get_user(request)
        answer_content = req_data['answer_content']
        answer = Answer(question=Question.objects.get(id=question_or_answer_id),
                        author=Profile.objects.get(user=answer_author),
                        question_type=question_type,
                        content=answer_content)
        answer.save()
        response_dict = {'question_id': answer.question.id,
                         'author': answer_author.username,
                         'question_type': answer.question_type,
                         'answer_content': answer.content,
                         }
        return JsonResponse(response_dict, status=200)
    elif request.method == "GET":
        ans = Answer.objects.get(id=question_or_answer_id)
        question = ans.question
        response_dict = {
            'id': ans.id,
            'author': ans.author.user.username,
            'publish_date_time': ans.publish_date_time,
            'question_type': ans.question_type,
            'content': ans.content,
            'place_name': question.location_id.name,
            'place_lat': question.location_id.latitude,
            'place_lng': question.location_id.longitude,
            'upvotes': ans.numbers_rated_up,
            'downvotes': ans.numbers_rated_down
        }
        return JsonResponse(response_dict, safe=False, status=200)
    else:
        # should not reach here.
        return -1


@check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
def get_answers(request, question_id):
    """
    function to get answers of question_id
    GET: get_answers api
    """
    question = Question.objects.get(id=question_id)
    answer_list = Answer.objects.filter(question=question)

    user = get_user(request)
    # ulist = []
    # for answer in answer_list:
    #     is_up_list = answer.users_rated_up_answers.all()
    #     is_down_list = answer.users_rated_down_answers.all()
    #     if user in is_up_list:
    #         ulist.append({'is_rated': True, 'is_up': True})
    #     elif user in is_down_list:
    #         user_rated = True
    #         ulist.append({'is_rated': True, 'is_up': False})
    #     else:
    #         ulist.append({'is_rated': False, 'is_up': False})
    response_dict = parse_answer_list(answer_list, user)
    # i = 0
    # for ans in response_dict:
    #     ans.update(ulist[i])
    #     i += 1
    return JsonResponse(response_dict, safe=False, status=200)


# @check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
def get_all_answers(request):
    """
    function to get all answers
    GET: get_all_answers api
    """
    user = get_user(request)
    # get most recent 100 answers without filtering
    answer_list = Answer.objects.filter()[:100]
    response_dict = parse_answer_list(answer_list, user)
    return JsonResponse(response_dict, safe=False, status=200)


@csrf_exempt
@check_login_required
@check_request
@require_http_methods(["GET"])
def get_user_answers(request, username=''):
    """
    get list of answers made by a user based on given username
    """
    if username == '':
        # get list of answers made by currently logged in user
        user = get_user(request)
    else:
        user = User.objects.get(username=username)

    profile = Profile.objects.get(user=user)
    answer_list = Answer.objects.filter(author=profile)
    response_dict = parse_answer_list(answer_list, user)

    return JsonResponse(response_dict, safe=False, status=200)


def parse_answer_list(answer_list, user):
    """
    Single function to parse given answer list
    and return the appropriate Json response dict
    """
    response_dict = [{
        'id': ans.id,
        'question_id': ans.question.id,
        'author': ans.author.user.username,
        'publish_date_time': ans.publish_date_time,
        'question_type': ans.question_type,
        'content': ans.content,
        'location_name': ans.question.location_id.name,
        'numbers_rated_up': ans.numbers_rated_up,
        'numbers_rated_down': ans.numbers_rated_down,
        'user_disliked': (user in ans.users_rated_down_answers.all()),
        'user_liked': (user in ans.users_rated_up_answers.all())
    } for ans in answer_list]

    return response_dict


@check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
def check_is_rated(request, answer_id):
    """function to check if the answer which corresponding to answer_id was rated
        GET: check_rating api"""

    answer = Answer.objects.get(id=answer_id)
    is_up_list = answer.users_rated_up_answers.all()
    is_down_list = answer.users_rated_down_answers.all()
    user = get_user(request)
    if user in is_up_list:
        response_dict = ({'is_rated': True, 'is_up': True})
    elif user in is_down_list:
        response_dict = ({'is_rated': True, 'is_up': False})
    else:
        response_dict = ({'is_rated': False, 'is_up': False})
    return JsonResponse(response_dict, safe=False, status=200)
