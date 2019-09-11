docker kill $(docker ps -q)
docker system prune
docker-compose up
