#!/bin/bash
# shellcheck disable=SC2046,SC2005,SC2002

node scripts/build.js

# Get variables from .env file
export $(echo $(cat .env."$1" | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
gsutil -m cp -r "src/images/copyrighted/*" gs://"$GCP_STORAGE_BUCKET"/
gsutil -m acl set -R -a public-read gs://"$GCP_STORAGE_BUCKET"/

firebase deploy -P "$1" --only hosting
