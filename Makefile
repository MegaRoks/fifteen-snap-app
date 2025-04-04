docker-build:
	docker compose -f docker-compose.yml build

docker-up:
	docker compose -f docker-compose.yml up

docker-down:
	docker compose -f docker-compose.yml down
