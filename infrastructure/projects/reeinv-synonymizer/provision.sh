#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./provision.sh <env> <extra tf args>"
    exit 1
fi

# Defines absolute path to provison.sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ENV=${1}
shift 1

terraform init
# shellcheck disable=2068
terraform apply -var-file=${DIR}/${ENV}/terraform.tfvars ${@}
