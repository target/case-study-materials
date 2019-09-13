# Product Info API

Displays a list of products or a list of a single product. This application starts on port 8000. Note: none of the data used in these results are real. They are auto-generated fake data.

There are two api calls available, if you start this docker container you should be able to see results from these two sample URLs:

## Using in Docker Compose
target/casestudy:product_info_api  

## Get all products
- (GET) http://localhost:8000/products

## Get a single product
- (GET) http://localhost:8000/product/1001

## Product json
```javascript
{
  "product_id": 1001,
  "department": "Home",
  "cost": "$1.46",
  "current_price": "$8.63",
  "company": "Huels, Hartmann and Koelpin",
  "product_title": "PORTTITOR",
  "product_subtitle": "evolve clicks-and-mortar e-services",
  "product_description": "morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci",
  "attributes": "Cloned holistic Graphic Interface",
  "lifecycle_start": "6/9/2015",
  "lifecycle_end": "3/14/2029",
  "markdown_date": "7/17/2017",
  "isbn": "848289027-1",
  "color": "Turquoise",
  "active": true,
  "like_products": [
    1464,
    1844,
    1166,
    1205,
    1788,
    1681,
    1767,
    1423,
    1065,
    1730
  ]
}
```

# Build the Docker Container
To build and run the docker container locally, you can use the `kill-tag-run.sh` script. This script will start the container on `http://127.0.0.1:8000`.
