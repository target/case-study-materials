This is an example case study built with the target-case-study sdk

# Assignment

### Objective:
    Build a product search api that consumes and decorates an existing product api.

### Requirements:
    
Build an api that adheres to the following [swagger](https://swagger.io/resources/open-api/) specification

```yml
swagger: "2.0"
info:
  description: "A simple api to search products"
  version: "1.0.0"
  title: "Product Search Api"
host: "localhost:8000"
schemes:
- "http"
paths:
  /products:
    get:
      summary: "Searches products"
      produces:
      - "application/json"
      parameters:
      - name: "search"
        in: "query"
        description: "Search value to filter product results"
        type: "string"
        required: false
      responses:
        200:
          description: "successful operation"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/Product"
definitions:
  Product:
    type: "object"
    properties:
      product_id:
        type: "integer"
      product_title:
        type: "string"
      current_price:
        type: "string"
```

This api should:
 - Include an http server that listens on port 8000
 - Include one endpoint `/products` that supports HTTP GET requests
 - Allow an optional query parameter on this endpoint called `search` that is used to filter products by name
 - Source products from the product_info_api


### Example

#### Request
```bash
# Should return only products whose name contains the substring 'MALESUADA'
curl http://localhost:8000/products?search=MALESUADA
```

#### Response: 
```json
[
  {
    "product_id": 1019,
    "product_title": "MI PEDE MALESUADA",
    "current_price": "$5.99"
  },
  {
    "product_id": 1411,
    "product_title": "MI PEDE MALESUADA",
    "current_price": "$6.61"
  },
  {
    "product_id": 1533,
    "product_title": "PEDE MALESUADA",
    "current_price": "$5.20"
  },
  {
    "product_id": 1568,
    "product_title": "MALESUADA",
    "current_price": "$7.79"
  }
]
```

### target-case-study sdk
You will be using the target-case-study sdk to develop your api.
Install it [here](https://git.target.com/csr/target-case-study) (you will also need to install docker and node on your machine)

You will use the cli to initialize, run, test, and package your application

To initialize your application run
```bash
case-study init --base=<your-desired-base-here> --destination=<my-app-name> --services=product_info_api
```

### Example Workflow
```bash
case-study init --base=java-spring-boot --destination=my-app --services=product_info_api
cd my-app
case-study run
case-study test
case-study pack
# packed application can now be found at my-app.zip
# submit my-app.zip via slack
```

Once the application is in a running state, you can fetch products from the product_info_api via the following urls
```
http://services/product_info_api/products/ (From inside of the docker conainer, eg java code)
http://localhost:8001/product_info_api/products/ (From outside of the docker conainer, eg postman)
```

### Before You Submit
Before you pack and submit, ensure that your application can be run and tested through the provided commands. For security reasons, these commands will be used by reviewers to run and test your application.
```
case-study run
case-study test
```

# Evaluation
Once the application is packed, the candidate will submit the packed application to be reviewed (via email/slack).
Evaluation can be done both manually and in an automated fashion.

### Manual Evaluation
```bash
case-study unpack --source=./my-app.zip --destination=./my-app
cd my-app
case-study test
case-study run
# Do manual testing
```

### Automated Evaluation
Below shows how to run E2E tests built on the target-case-study library
```bash
cd ./tests # Note: path here is relative to the location of this README
npm install
npm test
```
