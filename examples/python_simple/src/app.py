# app.py - a minimal flask api using flask_restful
from flask import Flask
from flask_restful import Resource, Api
import requests
import json


app = Flask(__name__)
api = Api(app)

version_api_url = 'http://version_api:8000'
fake_api_url = 'http://fake_api:8000'

class HelloWorld(Resource):
    def get(self):
        version = json.loads(requests.get(version_api_url).text)['version']
        address = json.loads(requests.get(fake_api_url).text)['address']
        return {"version":version, "address":address}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
