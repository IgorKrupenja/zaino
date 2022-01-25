#!/bin/bash
# shellcheck disable=SC2046,SC2005,SC2002

node scripts/build.js

# Get variables from .env file
export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
gcloud config set project "$REACT_APP_FIREBASE_PROJECT_ID"
gsutil -m cp -r "src/images/copyrighted/*" gs://"$REACT_APP_FIREBASE_STORAGE_BUCKET"/
gsutil -m acl set -R -a public-read gs://"$REACT_APP_FIREBASE_STORAGE_BUCKET"/

firebase deploy -P "$1" --only hosting
