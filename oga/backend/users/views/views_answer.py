"""functional views api for the models"""
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.models import Question, Answer, Profile
from users.views.decorators import check_request, check_login_required


@check_login_required
@check_request
@require_http_methods(["GET", "POST"])
@csrf_exempt
def get_or_create_answer(request, question_or_answer_id):
    """function for post answer of question_id or get answer of answer_id
        POST: create_answer api
        GET: get_answers api"""
    if request.method == "POST":
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
    """function to get answers of question_id
        GET: get_answers api"""
    response_dict = []
    question = Question.objects.get(id=question_id)
    answer_all_list = Answer.objects.filter(question=question)
    response_dict = [{
        'id': ans.id,
        'author': ans.author.user.username,
        'publish_date_time': ans.publish_date_time,
        'question_type': ans.question_type,
        'content': ans.content,
    } for ans in answer_all_list]
    return JsonResponse(response_dict, safe=False, status=200)


@csrf_exempt
@check_login_required
@check_request
@require_http_methods(["GET"])
def get_user_answers(request):
    """
    get list of answers made by user
    """
    response_dict = []
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    answer_list = Answer.objects.filter(author=profile)
    response_dict = [{
        'id': ans.id,
        'question_id': ans.question.id,
        'question_author': ans.question.author.username,
        'question_publish_date_time': ans.question.publish_date_time,
        'location': ans.question.location_id.name,
        'publish_date_time': ans.publish_date_time,
        'question_type': ans.question_type,
        'content': ans.content,
    } for ans in answer_list]
    return JsonResponse(response_dict, safe=False, status=200)
