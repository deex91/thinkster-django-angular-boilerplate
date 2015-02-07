from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from surveys.models import Survey, SolutionAnswer
from surveys.permissions import IsAuthorOfSurvey
from surveys.serializers import SurveySerializer, SolutionAnswerSerializer, SingleAnswerSerializer


class SolutionAnswerViewSet(viewsets.ModelViewSet):
    queryset = SolutionAnswer.objects.order_by('id')
    serializer_class = SolutionAnswerSerializer

    def get_permissions(self):
        return (permissions.AllowAny(),)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.create(request.data)
        return Response(status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        instance = serializer.save()
        return instance


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.order_by('-created_at')
    serializer_class = SurveySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfSurvey(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        return instance



class AccountSurveysViewSet(viewsets.ViewSet):
    queryset = Survey.objects.select_related('author').all()
    serializer_class = SurveySerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class SurveyIdViewSet(viewsets.ViewSet):
    queryset = Survey.objects.select_related('id').all()
    serializer_class = SurveySerializer

    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(id=pk)
        serializer = self.serializer_class(queryset, many=True)
        data_len = serializer.data.__len__()

        if data_len > 0:
            return Response(serializer.data)

        return Response({
	    		'status': 'Bad request',
	    		'message': 'Ankieta nie istnieje.'
	    	}, status=status.HTTP_400_BAD_REQUEST)


class StatsViewSet(viewsets.ViewSet):
    queryset = SolutionAnswer.objects.select_related('id').all()
    serializer_class = SingleAnswerSerializer

    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(answer_id=pk)
        serializer = self.serializer_class(queryset, many=True)
        data_len = serializer.data.__len__()

        return Response({
            'id': pk,
            'len': data_len
        })