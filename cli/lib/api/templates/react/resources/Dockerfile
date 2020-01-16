# Base image
FROM node:12.2.0-alpine

# Will only re-run if package.json changes
COPY ./package.json /app/package.json

# Set working directory
WORKDIR /app

# Install and cache app dependencies
RUN npm install

# Re-runs if anything in app changes
COPY ./ /app

# Start app
CMD ["npm", "start"]
