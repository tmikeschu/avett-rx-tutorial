#!/bin/sh

# load nextjs secrets
set -a
source ./.env.local
set +a

curl -u $FAUNA_ADMIN_KEY: https://graphql.fauna.com/import --data-binary "@schema.graphql"