FROM node:14 AS camps_api_dev

ENV WORKDIR_APP=/usr/src/camps-api
WORKDIR $WORKDIR_APP

COPY . $WORKDIR_APP

EXPOSE 8080

RUN yarn install
