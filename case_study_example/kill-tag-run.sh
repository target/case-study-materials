docker network create --driver bridge case_study_network
docker rm $(docker stop $(docker ps -a -q --filter ancestor=case_study_example --format="{{.ID}}"))
docker build -t case_study_example:latest .
docker run --net=case_study_network -d -p 8000:8000 case_study_example:latest 
