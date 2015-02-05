from rest_framework import serializers

from authentication.serializers import AccountSerializer
from surveys.models import Survey, Question, Answer, SolutionAnswer


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer

        fields = ('id', 'content')
        read_only_fields = 'id'


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question

        fields = ('id', 'content', 'answers')
        read_only_fields = 'id'


class SingleAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = SolutionAnswer
        fields = ('id', 'answer_id')
        read_only_fields = 'id'


class SolutionAnswerSerializer(serializers.ModelSerializer):
    answers = SingleAnswerSerializer(many=True)

    class Meta:
        fields = 'answers'

    def create(self, validated_data):
        solution_data = validated_data.pop('answers')
        for answer_data in solution_data:
            solution_answer = SolutionAnswer.objects.create(**answer_data)
            solution_answer.save()


class SurveySerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Survey

        fields = ('id', 'author', 'title', 'created_at', 'questions')
        read_only_fields = ('id', 'created_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SurveySerializer, self).get_validation_exclusions()

        return exclusions + ['author']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        survey = Survey.objects.create(**validated_data)
        survey.save()
        for question_data in questions_data:
            answers_data = question_data.pop('answers')
            question = Question.objects.create(survey=survey, **question_data)
            question.save()
            for answer_data in answers_data:
                answer = Answer.objects.create(question=question, **answer_data)
                answer.save()

        return survey


