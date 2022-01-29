#!/bin/bash

# NODE_ENV=$1

# Get variables from .env files
export $(echo $(cat .env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)

# todo  gcloud config set project "$REACT_APP_FIREBASE_PROJECT_ID"

firebase -P "$1" functions:config:set settings.functionsRegion="$FIREBASE_FUNCTIONS_REGION"
# firebase -P "$1" functions:config:set settings.functionsRegion="$FIREBASE_FUNCTIONS_REGION"
rm -rf ./build
tsc

firebase deploy -P "$1" --only functions,firestore

# todo
# todo check if need quoting fn name
# gcloud pubsub topics create "add-seed-data"
# gcloud pubsub topics publish "add-seed-data" --message "$(date -R): seeding DB"

# node scripts/build.js

# # Get variables from .env file
# export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
# gcloud config set project "$REACT_APP_FIREBASE_PROJECT_ID"
# gsutil -m cp -r "src/images/copyrighted/*" gs://"$REACT_APP_FIREBASE_STORAGE_BUCKET"/
# gsutil -m acl set -R -a public-read gs://"$REACT_APP_FIREBASE_STORAGE_BUCKET"/

# firebase deploy -P "$1" --only hosting
