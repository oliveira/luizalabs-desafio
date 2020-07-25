FROM node:12.16.1-alpine

WORKDIR /app

RUN ls -la

ADD .eslintrc package.json ./
RUN npm install -q

ADD / ./

RUN chmod +x init.sh

ENTRYPOINT [ "./init.sh" ]
