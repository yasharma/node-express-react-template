#!/usr/bin/env bash

npm install --registry http://scr.saal.ai:4873

docker run                  \
    --rm                    \
    --name=saal-author-tool       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8096" \
    -v "${PWD}":/saal \
    -w "/saal"  \
    -p 8096:8096            \
    node:9.11.2-alpine \
    npm run dev