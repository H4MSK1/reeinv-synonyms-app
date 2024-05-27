# Terraform

## Prerequisites

Ensure you have installed all the tools described in the parent [README](../../README.md).

## Provisioning

These steps provision the infrastructure for the set environment.

1. Authenticate
   Create default credentials. These are used by terraform for authentication:
   ```sh
   gcloud auth application-default login
   ```
2. Deploy terraform
   ```sh
   ./provision.sh <env>
   ```
   Replace `<env>` with `prod` for instance.
