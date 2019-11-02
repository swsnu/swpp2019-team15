"""functional views api for the models"""
import json

# from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.models import Question, Answer, Profile
from users.views.decorators import check_request, check_login_required


@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def create_answer(request, question_id):
    """create_answer api"""
    req_data = json.loads(request.body.decode())
    question_type = req_data['question_type']
    answer_author = get_user(request)
    answer_content = req_data['answer_content']

    answer = Answer(question=Question.objects.get(id=question_id),
                    author=Profile.objects.get(user=answer_author),
                    question_type=question_type,
                    content=answer_content)
    answer.save()
    response_dict = {'question_id': answer.question.id,
                     'author': answer_author.username,
                     'question_type': answer.question_type,
                     'answer_content': answer.content}
    return JsonResponse(response_dict, status=200)
