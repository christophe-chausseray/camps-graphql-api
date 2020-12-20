FROM node:14 as camps_api_prod

WORKDIR /usr/src/camps-api

# Install dependencies
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Build application
COPY . ./
RUN yarn run build:ts

EXPOSE 8080
CMD ["yarn", "watch:server"]
