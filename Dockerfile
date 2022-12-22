FROM node:16-alpine as base

WORKDIR /app

COPY tsconfig.json .
COPY webpack.config.js .
COPY package.json .
COPY yarn.lock .

RUN yarn
