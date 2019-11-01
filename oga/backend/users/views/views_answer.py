"""functional views api for the models"""
import json

# from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.models import Question, Answer
from users.views.decorators import check_request, check_login_required

@check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
def create_answer(request):
    """create_answer api"""
    req_data = json.loads(request.body.decode())
    question_id = req_data['question_id']
    question = Question.objects.get(id=question_id)
    question_type = req_data['question_type']
    answer_author = get_user(request)
    answer_content = req_data['answer_content']

    answer = Answer(question=question,
                    author=answer_author,
                    question_type=question_type,
                    content=answer_content)
    question.save()
    return JsonResponse(response_dict, status=200)