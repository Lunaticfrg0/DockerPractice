FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/src

COPY ./src /home/src

WORKDIR /home/src

RUN npm install

CMD ["node", "app.js"]