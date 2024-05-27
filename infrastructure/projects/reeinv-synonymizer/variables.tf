variable "project_name" {
  type    = string
  default = "reeinv-synonymizer"
}

variable "environment" {
  description = "Shorthand name of the environment, example 'prod'"
  type        = string
}

variable "billing_account" {
  type    = string
  default = "01374C-258BE8-394CF2"
}

variable "default_region" {
  description = "Default region used across the project"
  type        = string
  default     = "europe-west1"
}

variable "activate_apis" {
  description = "List of GCP API's to enable for this project"
  default = [
    "run.googleapis.com",
    "firebase.googleapis.com",
    "firebasehosting.googleapis.com",
    "admin.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "eventarc.googleapis.com",
    "iam.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
  ]
}

variable "git_branch" {
  description = "Git branch pattern for Cloudbuild to trigger on"
  type        = string
  default     = null
}

variable "git_tag" {
  description = "Git tag pattern for Cloudbuild to trigger on"
  type        = string
  default     = null
}

variable "iam_cloudbuild_service_account" {
  description = "IAM roles for Cloudbuild service account"
  type        = list(string)
  default     = [
    "roles/iam.serviceAccountUser",
    "roles/run.developer",
    "roles/firebase.admin",
    "roles/serviceusage.apiKeysAdmin",
  ]
}
