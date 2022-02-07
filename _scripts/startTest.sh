docker compose -f docker-compose-init.yaml -f docker-compose.test.yaml up -docker
docker exec -it debug_test_api bash -c "npm install &&  npm test"