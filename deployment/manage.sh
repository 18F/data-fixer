#!/bin/bash
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

#set -eo pipefail

LOGIN_GOV_SERVICE=login-gov
LOGIN_GOV_ISSUER="urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience"
TERRAFORM_SERVICE=terraform-user
TERRAFORM_SERVICE_KEY=${TERRAFORM_SERVICE}-key
TERRAFORM_STORAGE_SERVICE=terraform-storage
TERRAFORM_STORAGE_SERVICE_KEY=${TERRAFORM_STORAGE_SERVICE}-key

usage()
{
    cat << EOF
Manage a cloud.gov deployment environment.

Usage: manage.sh <OPERATION> -o <cloud.gov organization name> -s <cloud.gov space name>

OPERATION:
    setup   - create a new cloud.gov space, login.gov certificate, and strapi secrets
    show    - show Terraform S3 and cloud.gov credentials
    export  - when used with `source`, exports credentials to the environment
    deploy  - deploy the locally-built application via Terraform

Options:
  -o, --organization organization_name   Cloud.gov organization name
  -s, --space space_name                 Cloud.gov space name
  -h                                     Print usage
EOF
}

validate_parameters()
{
  if [ -z ${operation+x} ]; then
    printf "${RED}Please supply an operation.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${organization_name+x} ]; then
    printf "${RED}Please provide an organization name.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${space_name+x} ]; then
    printf "${RED}Please provide a space name.\n${NC}"
    usage
    exit 1
  fi
}

space_exists() {
  cf space "$1" >/dev/null 2>&1
}

service_exists() {
  cf service "$1" >/dev/null 2>&1
}

service_key_exists() {
  cf service-key "$1" "$2" >/dev/null 2>&1
}

export_terraform_storage_key() {
  echo "Querying for ${TERRAFORM_STORAGE_SERVICE}..."
  TERRAFORM_STORAGE_SERVICE_KEY=$(cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY} | tail -n +2)
  echo "Exporting ${TERRAFORM_STORAGE_SERVICE} S3 AWS credentials..."
  export AWS_ACCESS_KEY_ID=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .access_key_id)
  export AWS_SECRET_ACCESS_KEY=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .secret_access_key)
  export AWS_DEFAULT_REGION=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .region)
  export BUCKET_NAME=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .bucket)
}

export_service_key() {
  echo "Querying for ${TERRAFORM_SERVICE_KEY}..."
  SERVICE_KEY=$(cf service-key terraform-user ${TERRAFORM_SERVICE_KEY} | tail -n +2)
  echo "Exporting ${TERRAFORM_SERVICE_KEY} CF_USER, CF_PASSWORD..."
  export CF_USER=$(echo $SERVICE_KEY | jq -r .username)
  export CF_PASSWORD=$(echo $SERVICE_KEY | jq -r .password)
}

export_environment() {
  export_terraform_storage_key
  export_service_key
}

generate_login_gov_keys() {
  key_prefix=login-gov-${organization_name}-${space_name}

  # Generate private key
  openssl genrsa \
    -out deployment/${key_prefix}-private.pem \
    4096

  # Output public key
  openssl rsa \
    -in deployment/${key_prefix}-private.pem \
    -out deployment/${key_prefix}-public.pem \
    -pubout

  # Generate self-signed certificate
  openssl req \
    -key deployment/${key_prefix}-private.pem \
    -new \
    -x509 \
    -days 3650 \
    -subj "/C=US/O=General Services Administration/OU=TTS/CN=gsa.gov" \
    -out deployment/${key_prefix}-cert.pem

  # Generate JWK from private key; store on filesystem, and load to env var.
  cat deployment/${key_prefix}-private.pem \
    | pem-jwk \
    > deployment/${key_prefix}.jwk
  LOGIN_GOV_JWK=`cat deployment/${key_prefix}.jwk | jq -aRs`
}

setup() {
  if space_exists "${space_name}" ; then
    echo space "${space_name}" already created
  else
    cf create-space ${space_name} -o ${organization_name}
  fi

  if service_exists "${TERRAFORM_SERVICE}" ; then
    echo ${TERRAFORM_SERVICE} already created
  else
    cf create-service cloud-gov-service-account space-deployer ${TERRAFORM_SERVICE}
  fi

  if service_exists "${TERRAFORM_STORAGE_SERVICE}" ; then
    echo space "${TERRAFORM_STORAGE_SERVICE}" already created
  else
    cf create-service s3 basic-sandbox ${TERRAFORM_STORAGE_SERVICE}
  fi

  setup_keys

  export_environment
  aws s3api put-bucket-versioning --bucket $BUCKET_NAME --versioning-configuration Status=Enabled

  if service_exists "${LOGIN_GOV_SERVICE}" ; then
    echo space "${LOGIN_GOV_SERVICE}" already created
  else
    generate_login_gov_keys
    cf create-user-provided-service "${LOGIN_GOV_SERVICE}" -p "{\"issuer\": \"${LOGIN_GOV_ISSUER}\", \"jwkFullKey\": ${LOGIN_GOV_JWK}}"
  fi
}

setup_keys() {
  if service_key_exists "${TERRAFORM_SERVICE}" "${TERRAFORM_SERVICE_KEY}" ; then
    echo ${TERRAFORM_SERVICE_KEY} already created
  else
    echo "Creating ${TERRAFORM_SERVICE_KEY}..."
    cf create-service-key ${TERRAFORM_SERVICE} ${TERRAFORM_SERVICE_KEY}
  fi

  if service_key_exists "${TERRAFORM_STORAGE_SERVICE}" "${TERRAFORM_STORAGE_SERVICE_KEY}" ; then
    echo ${TERRAFORM_STORAGE_SERVICE_KEY} already created
  else
    echo "Creating ${TERRAFORM_STORAGE_SERVICE_KEY}..."
    cf create-service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY}
  fi

  echo "To see service keys, execute './deployment/manage.sh'"
}

print_service_key() {
  cf service-key terraform-user ${TERRAFORM_SERVICE_KEY}
}

print_bucket_details() {
  export_terraform_storage_key
  aws s3api get-bucket-encryption --bucket $BUCKET_NAME
  aws s3api get-bucket-policy --bucket $BUCKET_NAME
}

print_terraform_storage_key() {
  cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY}
}

show() {
  print_service_key
  print_terraform_storage_key
  print_bucket_details
}

deploy() {
  export_environment

  # Push to container registry
  yarn bazel run \
    --platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 \
    //datafixer/context/server:image-push

  # Push to cloud.gov sandbox
  cf target -o ${ORGANIZATION_NAME} -s ${SPACE_NAME}
  cf push
}

while [ "$1" != "" ]; do
  case $1 in
    setup | show | export | deploy | generate_login_gov_keys ) operation=$1
                                ;;
    -o | --organization )       shift
                                organization_name=$1
                                ;;
    -s | --space )              shift
                                space_name=$1
                                ;;
    -h | --help )               usage
                                exit
                                ;;
    * )                         usage
                                exit 1
  esac
  shift
done

validate_parameters

# Target all operations to the provided organization/space pair.
cf target -o ${organization_name} -s ${space_name}

case $operation in
  setup )                         setup
                                  ;;
  show )                          show
                                  ;;
  export )                        export_environment
                                  ;;
  deploy )                        deploy
                                  ;;
  generate_login_gov_keys )       generate_login_gov_keys
                                  ;;
  * )                             usage
                                  exit 1
esac
