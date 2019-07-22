# app.py - a minimal flask api using flask_restful
from flask import Flask
from flask_restful import Resource, Api
from faker import Faker

fake = Faker()

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'name':fake.name(), 'address':fake.address(), 'text':fake.text()}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
