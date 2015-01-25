from rest_framework import permissions


class IsAuthorOfSurvey(permissions.BasePermission):
    def has_object_permission(self, request, view, survey):
        if request.user:
            return survey.author == request.user
        return False