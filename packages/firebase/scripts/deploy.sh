#!/bin/bash

gcloud config set project "$FIREBASE_PROJECT_ID"

# Get variables from .env files
export $(echo $(cat .env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)

firebase -P "$1" functions:config:set settings.functions.region="$FIREBASE_FUNCTIONS_REGION"
firebase -P "$1" functions:config:set settings.backups.bucket="$GCP_STORAGE_BACKUPS_BUCKET"
rm -rf ./build
tsc

firebase deploy -P "$1" --only functions,firestore

gsutil ls -b gs://"$GCP_STORAGE_BACKUPS_BUCKET" || gsutil mb -l "$GCP_STORAGE_BACKUPS_REGION" -c NEARLINE gs://"$GCP_STORAGE_BACKUPS_BUCKET"

# todo check if need quoting fn name
# gcloud pubsub topics create "add-seed-data"
# gcloud pubsub topics publish "add-seed-data" --message "$(date -R): seeding DB"
