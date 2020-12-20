FROM node:14 as camps_api_prod

WORKDIR /usr/src/camps-api

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn run build:ts

EXPOSE 8080
CMD ["yarn", "watch:server"]
