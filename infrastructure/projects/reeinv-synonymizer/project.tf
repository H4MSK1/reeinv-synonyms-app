module "project" {
  source  = "terraform-google-modules/project-factory/google"
  version = "~> 14.1"

  name              = "${var.project_name}-${var.environment}"
  random_project_id = true
  billing_account   = var.billing_account

  default_service_account = "deprivilege"

  labels = {
    env = var.environment
  }

  activate_apis = var.activate_apis
}

output "project_id" {
  value = module.project.project_id
}

output "project_number" {
  value = module.project.project_number
}
