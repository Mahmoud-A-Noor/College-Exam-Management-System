from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def user_type_required(user_type):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self, request, *args, **kwargs):
            if self.request.user.is_authenticated and (self.request.user.user_type in user_type or 'any' in user_type):
                return view_func(self, request, *args, **kwargs)
            else:
                return Response({'error':'You are not authorized to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)
        return _wrapped_view
    return decorator