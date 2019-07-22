docker network create --driver bridge case_study_network 
docker rm $(docker stop $(docker ps -a -q --filter ancestor=categories_api --format="{{.ID}}"))
docker build -t categories_api:latest .
docker run --net=case_study_network -d -p 5002:5002 --name=categories_api categories_api:latest 
