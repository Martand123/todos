from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

# mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
mongo_uri = 'mongodb://localhost:27017'
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        todo_items = list(db.todos.find({}))
        print(todo_items)
        # todos = [todo['todo'] for todo in todo_items]
        todos = [item['description'] for item in todo_items if 'description' in item]       
        return Response(todos, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        data = request.data
        result = db.todos.insert_one(data)
        data.pop('_id', None)
        return Response(data, status=status.HTTP_200_OK)

