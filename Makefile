docker-build:
	docker compose -f docker-compose.yml build

docker-build:
	docker compose -f docker-compose.yml up

docker-down:
	docker compose -f docker-compose.yml down

rl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $(AUTH_TOKEN)" --data-binary "@$(WORKFLOW_FILE)" $(N8N_API_URL)