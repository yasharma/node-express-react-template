# Currency Conversion Service

The service will be resposible for converting currency from on country currency to another country or multiple country currency values.

## Service Architecture:

-   Node.js Epxress backend.

## Service Features:

1.  currency conversion and would calculate based on base currency given.

## Build Steps:

local: ./start.sh
cluster: Dockerfile

## Run Tests:

./test.sh

## Environment Variables:

1.  `APP_HOST = localhost`
2.  `APP_PORT = 8086`
3.  `FROM = HKD` 
4.  `TO = EUR` 
5.  `EXCHANGE_RATE_URL = https://api.exchangeratesapi.io` 


## Service Dependencies:

### Upstream

### Downstream

## Database Required(if any):

## Ports Used:

1.  **8090**

# APIs

**1. Get currency value from HKD to EUR with the amount given**

```
Api Url : {URL}}/currency_EUR/:amount
Method : GET
```

Response : 200

```json
0.1158788834
```

# Contacts:

1.  Service Owner: ** **
2.  Email: ** **
