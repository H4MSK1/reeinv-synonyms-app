# Terraform

## Prerequisites

Ensure you have installed all the tools described in the parent [README](../../README.md).

## Provisioning

This command provisions the infrastructure for the set environment.

1. Authenticate
   Create default credentials. These are used by terraform for authentication:
   ```sh
   gcloud auth application-default login
   ```
2. Deploy terraform
   ```sh
   ./provision.sh <env>
   ```
