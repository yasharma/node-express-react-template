# Saal Author Tool

This application is responsible for managing contents (question) display in app and web 

## Service Architecture:

-   ReactJS frontend
-   Node.js Epxress backend.

## Service Features:

1. Admin can upload CSV
2. List and preview all the question
3. Edit and save the questions

## Run steps only for local development

### First start backend server
```sh
cd server
./start.sh
```
OR run directly `server.sh` file as following

```sh
. ./server.sh
```

### Start client app
```sh
cd client
yarn start
```
OR run directly `client.sh` file as following

```sh
. ./client.sh
```

## Build Steps:
cluster: Dockerfile

## Healthcheck:

1.  Endpoint: **/healthcheck**
2.  Expected HTTP Response Code: **200**

## Environment Variables:

1.  `APP_HOST = localhost`
2.  `APP_PORT = 8086`
3.  `LOGGER_CONFIG = JSON Config Object`
4.  `QUESTION_BANK_URI = http://quiz-bank-uri`

## Service Dependencies:
### Upstream
1. Web client

## Ports Used:
1. **8096**
