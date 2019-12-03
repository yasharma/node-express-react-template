FROM node:9.11.2-alpine
RUN apk --update add curl

LABEL authors="Sample <sample@email>"

RUN mkdir /www

COPY ["./package.json", "tsconfig.json", "debug.sh",  "/www/"]

WORKDIR /www

EXPOSE  8086

CMD ["sh", "debug.sh"]
