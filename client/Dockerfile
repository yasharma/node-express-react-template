# Stage 1, "build-stage"
FROM node:9.11.2-alpine as react-build
RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "tsconfig.json", "/app/"]
RUN npm install
COPY ./ /app/

RUN npm run build

# Stage 2, based on Nginx
FROM nginx:1.17.0-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80