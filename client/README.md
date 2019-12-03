# Currency Conversion

This application is responsible for currency conversion

## Service Architecture:

-   ReactJS frontend
-   Nginx Server to serve the static files

## Service Features:

1. Amount to be entered which returns the conersion result
2. From and to needs to be given in config files

## Run steps only for local development

### Start client app
```sh
yarn start
```

## Build Steps:
cluster: Dockerfile

## Healthcheck:

1.  Endpoint: **/**
2.  Expected HTTP Response Code: **200**

## Smoke Test:

1.  Endpoint: **/**
2.  Expected HTTP Response Code: **200**

## Environment Variables:

## Service Dependencies:
### Upstream
1. Web client

## Ports Used:
1. **80**

## Service Owner:
