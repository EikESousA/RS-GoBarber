docker run --name gostack_postgres -3 POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name mongodb -p 27017:27017 -d -t mongo
docker run --name redis -p 6379:6379 -d -t redis:alpine

docker start gostack_postgres mongodb redis
