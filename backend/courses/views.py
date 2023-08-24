from rest_framework import generics
from .serializers import DepartmentSerializer, CourseSerializer, RequestSerializer
from .models import Department, Course, Request
from rest_framework.response import Response
from rest_framework import status
from .decorators import user_type_required

class BaseGenericView(generics.GenericAPIView):
    queryset = None
    serializer_class = None

    @user_type_required(['any'])
    def get(self, request, pk=None):
        if pk:
            try:
                instance = self.get_queryset().get(pk=pk)
                serializer = self.serializer_class(instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'error':'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @user_type_required(['admin'])
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @user_type_required(['admin'])
    def put(self, request, pk):
        try:
            instance = self.get_queryset().get(pk=pk)
            data = request.data
            serializer = self.serializer_class(instance=instance, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'error':'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @user_type_required(['admin'])
    def delete(self, request, pk):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response({'msg':'item deleted'}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'error':'Not found'}, status=status.HTTP_404_NOT_FOUND)

class DepartmentView(BaseGenericView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class CourseView(BaseGenericView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class RequestListCreateView(generics.GenericAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    @user_type_required(['admin'])
    def get(self, request, pk=None):
        if pk:
            try:
                instance = self.get_queryset().get(pk=pk)
                serializer = self.serializer_class(instance=instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'error':'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @user_type_required(['any'])
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)