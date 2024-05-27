locals {
  cloudrun_service_name = "backend"
}

resource "google_cloudbuild_trigger" "deploy_cloudrun" {
  location       = var.default_region
  project        = module.project.project_id
  name           = local.cloudrun_service_name
  description    = "Deploys the backend cloud run integration"
  filename       = "${local.cloudrun_service_name}/cloudbuild.yaml"
  included_files = ["${local.cloudrun_service_name}/**"]

  github {
    name  = "reeinv-synonyms-app"
    owner = "H4MSK1"
    push {
      branch = try(var.git_branch, null)
      tag    = try(var.git_tag, null)
    }
  }

  substitutions = {
    _REGISTRY_URI    = local.repository_uri
    _REGION          = var.default_region
    _SERVICE         = local.cloudrun_service_name
    _IMAGE           = local.cloudrun_service_name
    _ALLOWED_ORIGIN  = "https://${module.project.project_id}.web.app"
  }
}

resource "google_cloud_run_service" "default" {
  project                    = module.project.project_id
  location                   = var.default_region
  name                       = local.cloudrun_service_name
  autogenerate_revision_name = true

  template {
    spec {
      container_concurrency = 1000

      containers {
        # An image needs to exist and listen on port 80 for deployment to succeed.
        # Since the registry and the CloudBuild job that will provide and build
        # the image are deployed at the same time, use a simple placeholder that
        # is ignored in subsequent deploys due to the lifecycle rule below
        image = "us-docker.pkg.dev/cloudrun/container/hello"

        startup_probe {
          # https://cloud.google.com/run/docs/configuring/healthchecks#http-startup-probe
          failure_threshold     = 5
          initial_delay_seconds = 60
          timeout_seconds       = 60
          period_seconds        = 60

          http_get {
            path = "/health"
            # Custom headers to set in the request
            # https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#http_headers
            http_headers {
              name  = "Access-Control-Allow-Origin"
              value = "*"
            }
          }
        }

        resources {
          requests = {
            cpu    = "4000m"
            memory = "4Gi"
          }

          limits = {
            cpu    = "4000m"
            memory = "6Gi"
          }
        }
      }
    }

    metadata {
      annotations = {
        # Max instances
        # https://cloud.google.com/run/docs/configuring/max-instances
        "autoscaling.knative.dev/maxScale" = 2

        # Min instances
        # https://cloud.google.com/run/docs/configuring/min-instances
        "autoscaling.knative.dev/minScale" = 1

        # Enable CPU boost during startup and the beginning of the first request
        "run.googleapis.com/startup-cpu-boost" = true
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [
      template[0].spec[0].containers[0].image,
    ]
  }

  timeouts {
    update = "1m"
  }
}

resource "google_cloud_run_service_iam_member" "noauth" {
  project = google_cloud_run_service.default.project
  location = google_cloud_run_service.default.location
  service = google_cloud_run_service.default.name
  role = "roles/run.invoker"
  member = "allUsers"
}
