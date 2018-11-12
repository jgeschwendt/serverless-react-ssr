# Load the environment variables
ifdef ENV
export ENV_FILE = .env.$(ENV)
else
export ENV_FILE = .env
endif

# Include the envionment variables in this Makefile
include $(ENV_FILE)

# Export these variables for docker-compose usage
export CONTAINER_NAME = serverless-react/devbox
export NODE_CONTAINER = \
	--interactive \
	--rm \
	--tty \
	--volume $(shell pwd):/var/task \
	--workdir /var/task \
	$(CONTAINER_NAME)

build-server:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run build:server

build-static:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run build:static

deploy:
	@make stop-docker
	@docker run --env-file .env.master $(NODE_CONTAINER) yarn run tsc
	@docker run --env-file .env.master $(NODE_CONTAINER) yarn run tslint
	@docker run --env-file .env.master $(NODE_CONTAINER) yarn run build:static
	@docker run --env-file .env.master $(NODE_CONTAINER) serverless deploy --stage master
  @docker run --env-file .env.master $(NODE_CONTAINER) serverless client deploy --no-confirm --stage master

check:
	@make tsc
	@make tslint

dev:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) /bin/bash

devbox:
	@docker build --no-cache --tag $(CONTAINER_NAME) .

install:
	@docker run $(NODE_CONTAINER) yarn install

profile:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run profile

start:
	@docker-compose -f docker-compose.yml down --remove-orphans --volumes
	@docker-compose -f docker-compose.yml up -d --no-recreate --remove-orphans

start-hard:
	rm -rf node_modules
	rm -f yarn.lock
	make devbox
	make install
	make start

stop:
	@docker-compose -f docker-compose.yml down --remove-orphans --volumes

stop-docker:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm

tsc:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run tsc

tslint:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run tslint

tslint-fix:
	@docker run --env-file $(ENV_FILE) $(NODE_CONTAINER) yarn run tslint:fix
