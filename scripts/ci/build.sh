#!/usr/bin/env bash

set -u -e -o pipefail

docker run \
  --env ARTIFACTS_BUCKET=$ARTIFACTS_BUCKET \
  --env API_DOMAIN_NAME=$API_DOMAIN_NAME \
  --env APP_DOMAIN_NAME=$APP_DOMAIN_NAME \
  --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
  --env APP_SSL_CERT_ARN=$APP_SSL_CERT_ARN \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run build:static

docker run \
  --env ARTIFACTS_BUCKET=$ARTIFACTS_BUCKET \
  --env API_DOMAIN_NAME=$API_DOMAIN_NAME \
  --env APP_DOMAIN_NAME=$APP_DOMAIN_NAME \
  --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
  --env APP_SSL_CERT_ARN=$APP_SSL_CERT_ARN \
  --rm \
  --tty \
  --volume $TRAVIS_BUILD_DIR:/var/task \
  --workdir /var/task \
  $CONTAINER_NAME yarn run build:server

exit 0
