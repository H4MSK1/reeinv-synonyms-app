locals {
  site_service_name = "frontend"
}

resource "google_cloudbuild_trigger" "deploy_frontend" {
  location       = var.default_region
  project        = module.project.project_id
  name           = local.site_service_name
  description    = "Deploys the frontend Firebase site"
  filename       = "${local.site_service_name}/cloudbuild.yaml"
  included_files = ["${local.site_service_name}/**"]

  github {
    name  = "reeinv-synonyms-app"
    owner = "H4MSK1"
    push {
      branch = try(var.git_branch, null)
      tag    = try(var.git_tag, null)
    }
  }

  substitutions = {
    _BACKEND_URL = google_cloud_run_service.default.status.0.url
  }
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = module.project.project_id
}

resource "google_firebase_web_app" "default" {
  provider = google-beta
  project  = google_firebase_project.default.project
  display_name = "Web app for Firebase hosting"
}

resource "google_firebase_hosting_site" "default" {
  provider = google-beta
  project  = google_firebase_project.default.project
  site_id = "${var.project_name}-${var.environment}"
  app_id = google_firebase_web_app.default.app_id
}
