terraform {
  required_version = "~> 1.8.4"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30.0"
    }

    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.30.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 5.45.0"
    }
  }
}

