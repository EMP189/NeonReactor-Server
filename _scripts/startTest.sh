docker compose -f docker-compose.dev.yaml -f docker-compose.test.yaml up -docker
docker exec -it debug_test_api bash -c "npm install &&  npm test"