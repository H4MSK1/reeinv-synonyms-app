locals {
  repository_uri = "${google_artifact_registry_repository.cloudrun.location}-${
    lower(google_artifact_registry_repository.cloudrun.format)}.pkg.dev/${
    google_artifact_registry_repository.cloudrun.project}/${
  google_artifact_registry_repository.cloudrun.name}"
}

resource "google_artifact_registry_repository" "cloudrun" {
  provider      = google-beta
  project       = module.project.project_id
  location      = var.default_region
  repository_id = "cloudrun"
  description   = "Registry for cloudrun docker images"
  format        = "DOCKER"
}

resource "google_artifact_registry_repository_iam_member" "repository_cloudrun_writer" {
  project    = module.project.project_id
  location   = var.default_region
  repository = google_artifact_registry_repository.cloudrun.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${module.project.project_number}@cloudbuild.gserviceaccount.com"
}
