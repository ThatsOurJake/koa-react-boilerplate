FROM node:18-alpine as base

WORKDIR /app

COPY tsconfig.json .
COPY webpack.config.js .
COPY package.json .
COPY yarn.lock .

RUN yarn

# -----

FROM base as build
COPY ./src ./src
RUN yarn build
WORKDIR /prod_modules
COPY package.json .
COPY yarn.lock .

RUN yarn

# ----

FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /prod_modules/node_modules /app/node_modules

RUN "node dist/index.js"
