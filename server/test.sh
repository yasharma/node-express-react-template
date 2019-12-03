#!/usr/bin/env bash


docker run                  \
    --rm                    \
    --name=currency-conversion-service-test       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8090" \
    --env "FROM=HKD"  \
    --env "TO=EUR"  \
    --env "EXCHANGE_RATE_URL=https://api.exchangeratesapi.io"  \
    -v "${PWD}":/currencyConvertor \
    -w "/currencyConvertor"  \
    node:9.11.2-alpine  \
    npm run test
