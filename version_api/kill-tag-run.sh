docker network create --driver bridge case_study_network 
docker rm $(docker stop $(docker ps -a -q --filter ancestor=version_api --format="{{.ID}}"))
docker build -t version_api:latest .
docker run --net=case_study_network -d -p 5000:5000 --name=version_api version_api:latest 
