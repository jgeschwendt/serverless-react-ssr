#!/usr/bin/env bash

set -u -e -o pipefail

docker run \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run tsc

docker run \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run tslint

exit 0
