docker network create --driver bridge case_study_network 
docker rm $(docker stop $(docker ps -a -q --filter ancestor=fake_api --format="{{.ID}}"))
docker build -t fake_api:latest .
docker run --net=case_study_network -d -p 5001:5001 --name=fake_api fake_api:latest 
