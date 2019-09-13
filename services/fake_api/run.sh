container="fake_api"
version="latest"
docker rm $container -f
docker build -t $container:$version . 
docker run -t -i -p 8000:8000 --name=$container $container:$version 
