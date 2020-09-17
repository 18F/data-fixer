#!/bin/sh
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

ORGANIZATION_NAME=sandbox-gsa
SPACE_NAME=daniel.naab

TERRAFORM_SERVICE=terraform-user

space_exists() {
  cf space "$1" >/dev/null 2>&1
}

service_exists() {
  cf service "$1" >/dev/null 2>&1
}

if [ "$1" = "setup" ] ; then echo
	if space_exists "${SPACE_NAME}" ; then
	  echo space "${SPACE_NAME}" already created
	else
	  cf create-space ${SPACE_NAME} -o ${ORGANIZATION_NAME}
	fi

  cf target -o ${ORGANIZATION_NAME} -s ${SPACE_NAME}

	if service_exists "${TERRAFORM_SERVICE}" ; then
	  echo ${TERRAFORM_SERVICE} already created
	else
	  cf create-service cloud-gov-service-account space-deployer ${TERRAFORM_SERVICE}
	  cf create-service-key ${TERRAFORM_SERVICE} ${TERRAFORM_SERVICE}-key
	  echo "to get the CF_USERNAME and CF_PASSWORD, execute './bin/cloudgov.sh print-service-key'"
	fi
fi

if [ "$1" = "print-service-key" ] ; then echo
  cf service-key terraform-user terraform-user-key
fi

if [ "$1" = "deploy" ] ; then echo
	# Push to container registry
	yarn bazel run \
		--platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 \
		//datafixer/context/server:image-push

	# Push to cloud.gov sandbox
	cf target -o ${ORGANIZATION_NAME} -s ${SPACE_NAME}
	cf push
fi
