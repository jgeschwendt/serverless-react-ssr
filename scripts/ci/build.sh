#!/usr/bin/env bash

set -u -e -o pipefail

docker run \
  --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run build:static

docker run \
  --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run build:server

exit 0
