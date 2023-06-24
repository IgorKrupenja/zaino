#!/bin/bash
# shellcheck disable=SC2046,SC2005,SC2002

# Get variables from .env files
export $(echo $(cat .env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)

gcloud config set project "$FB_PROJECT_ID"

firebase -P "$1" functions:config:set settings.functions.region="$FB_FUNCTIONS_REGION"
firebase -P "$1" functions:config:set settings.backups.bucket="$GCP_STORAGE_BACKUPS_BUCKET"
rm -rf ./build
tsc

firebase deploy -P "$1" --only functions,firestore --force

gsutil ls -b gs://"$GCP_STORAGE_BACKUPS_BUCKET" &>/dev/null || gsutil mb -l "$GCP_STORAGE_BACKUPS_REGION" -c NEARLINE gs://"$GCP_STORAGE_BACKUPS_BUCKET"

gcloud pubsub topics list | grep add-seed-data &>/dev/null || gcloud pubsub topics create add-seed-data
gcloud pubsub topics publish add-seed-data --message "$(date -R): seeding DB"
