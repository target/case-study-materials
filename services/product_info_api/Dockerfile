# Start with Node Alpine base
FROM node:8.6-alpine

MAINTAINER ""

# create a working directory for our app
WORKDIR /src

# install package.json separately
# this allows us to avoid reinstalling packages when our code changes
COPY src/package.json ./
RUN npm install

# copy our code to the docker container
COPY /src /src

EXPOSE 8000 

CMD node app.js
