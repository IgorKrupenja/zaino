#!/bin/bash

node scripts/build.js

export "$(echo $(cat .env.development | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)"
gsutil -m cp -r "src/images/copyrighted/*" gs://"$GCP_STORAGE_BUCKET"/

firebase deploy -P "$1" --only hosting
