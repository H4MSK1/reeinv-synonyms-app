resource "google_project_iam_member" "cloudbuild" {
  for_each = toset(var.iam_cloudbuild_service_account)
  project  = module.project.project_id
  role     = each.key
  member  = "serviceAccount:${module.project.project_number}@cloudbuild.gserviceaccount.com"
}
