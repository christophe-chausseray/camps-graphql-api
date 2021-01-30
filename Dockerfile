FROM node:14 AS camps_api_prod

WORKDIR /usr/src/camps-api

# Install dependencies
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Build application
COPY . ./
RUN yarn run build:ts

RUN chmod +x ./dist/src/infrastructure/cli/commander/index.js

EXPOSE 8080
CMD ["yarn", "watch:server"]
