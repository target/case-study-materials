#!/bin/bash

# create new network for our docker container to use
# bridge network allows easier communication between multiple docker containers
# this will only create the network if it doesn't already exist
NETWORK_NAME='case_study_network'
docker network inspect $NETWORK_NAME &>/dev/null || docker network create --driver bridge $NETWORK_NAME

# remove any running container to make sure we start fresh
docker rm $(docker stop $(docker ps -a -q --filter ancestor=product_info_api --format="{{.ID}}"))

# build a container with the latest changes
docker build -t product_info_api:latest .

# run the container. it will be exposed on port 5003.
docker run --net=case_study_network -d -p 5003:5003 --name=product_info_api product_info_api:latest
