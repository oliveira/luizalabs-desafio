FROM node:12.16.1-alpine

WORKDIR /app

ADD .eslintrc package.json ./
RUN npm install -q

ADD / ./


ADD init.sh /init

RUN chmod +x /init

ENV WAIT_VERSION 2.7.2

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait

RUN chmod +x /wait
