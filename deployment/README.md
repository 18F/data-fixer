# Deployment infrastructure

This package includes the IOC for a cloud.gov deployment.

## Usage

This configuration is intended to be run via CI and consists of:

- [./manage.sh](manage.sh) - bootstrap script for all actions

### Bootstrap cloud.gov

First, you must initialize a new cloud.gov space. This includes creating a space in the target cloud.gov organization, an S3 bucket for Terraform state storage, and a service user and corresponding key for CI jobs. Use the setup operation for this purpose:

```bash
./deployment/manage.sh setup -o <organization name> -s <space name>
```

### Deploy

Subsequently, you may deploy into the created cloud.gov space:

```bash
./deployment/manage.sh deploy -o <organization name> -s <space name>
```

### Login.gov Configuration

After bootstraping cloud.gov `manage.sh` will create public and private rsa keys in `./deployment` in the format of `deployment/login-gov-${organization_name}-${space_name}-cert.pem`. The public key needs to be added to https://dashboard.int.identitysandbox.gov/service_providers/YOUR_NUMBER_HERE. You will also need to configure redirect URIs for your new environment.
