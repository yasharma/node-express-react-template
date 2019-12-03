FROM node:9.11.2-alpine
RUN apk --update add curl

LABEL authors="SAAL <saal@saal.ai>"

RUN mkdir /www
WORKDIR /www

COPY ["./package.json", "./"]

COPY ["server/package.json", "server/tsconfig.json", "/www/server/"]

COPY server /www/server
COPY client /www/client

RUN cd /www/server && npm install
RUN cd /www/client && npm install

RUN npm -s run build

RUN rm -rf /www/client
RUN rm -rf /www/server/src

EXPOSE  8096
CMD ["node", "server/dist"]
