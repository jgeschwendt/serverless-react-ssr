#!/usr/bin/env bash

set -u -e -o pipefail

# Don't deploy if this is a PR build
if [[ ${TRAVIS_PULL_REQUEST:-} != "false" ]]; then
  echo "Skipping deploy, this is a PR build."
  exit 0
fi

if [ ${TRAVIS_BRANCH:-} == "master" ]; then
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
    --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    --env ARTIFACTS_BUCKET=$ARTIFACTS_BUCKET \
    --env API_DOMAIN_NAME=$API_DOMAIN_NAME \
    --env APP_DOMAIN_NAME=$APP_DOMAIN_NAME \
    --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
    --env APP_SSL_CERT_ARN=$APP_SSL_CERT_ARN \
    --rm \
    --tty \
    --volume $TRAVIS_BUILD_DIR:/var/task \
    --workdir /var/task \
    $CONTAINER_NAME yarn run deploy:dev:server

  docker run \
    --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    --env ARTIFACTS_BUCKET=$ARTIFACTS_BUCKET \
    --env API_DOMAIN_NAME=$API_DOMAIN_NAME \
    --env APP_DOMAIN_NAME=$APP_DOMAIN_NAME \
    --env APP_HOSTED_ZONE=$APP_HOSTED_ZONE \
    --env APP_SSL_CERT_ARN=$APP_SSL_CERT_ARN \
    --rm \
    --tty \
    --volume $TRAVIS_BUILD_DIR:/var/task \
    --workdir /var/task \
    $CONTAINER_NAME yarn run deploy:dev:static

  exit 0
fi

exit 0
