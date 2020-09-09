#!/bin/bash

# Push to container registry
yarn bazel run \
  --platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 \
  //context/server:image-push

# Push to cloud.gov sandbox
cf target -o sandbox-gsa -s daniel.naab
cf push
