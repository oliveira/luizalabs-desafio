FROM node:12.16.1-alpine

WORKDIR /app

RUN ls -la

ADD .eslintrc .env package.json ./
RUN npm install -q

ADD / ./

CMD ["npm", "start"]
