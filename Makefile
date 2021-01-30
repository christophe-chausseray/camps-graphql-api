DOCKER_COMPOSE = docker-compose
API_EXEC = $(DOCKER_COMPOSE) exec api

.DEFAULT_GOAL := help

## Help
.PHONY: help
help:
	@echo ""
	@echo "To install your camps api you need to run : make up"
	@echo "To uninstall your camps api you need to run : make down"
	@echo ""

.PHONE: up
up:
	cp .env.dist .env
	$(DOCKER_COMPOSE) up -d --remove-orphan
	$(MAKE) install_db

.PHONE: install_db
install_db:
	$(API_EXEC) yarn db:migrate
	$(API_EXEC) yarn link
	$(API_EXEC) yarn db:import:data

.PHONE: down
down:
	$(DOCKER_COMPOSE) down -v

.PHONE: test
test:
	$(API_EXEC) yarn test
