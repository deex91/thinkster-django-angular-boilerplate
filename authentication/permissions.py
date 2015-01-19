from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):	#Check if user associated with request is account owner
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False
