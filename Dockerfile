FROM  node:12.16.3-alpine as ts-build

# Arguments
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV \
  SERVICE_PORT=$SERVICE_PORT \
  APP_DIR=/usr/app/api \
  YARN_CACHE=/tmp/ycache

WORKDIR $APP_DIR

# Install app dependencies
COPY package* $APP_DIR/
COPY yarn.lock $APP_DIR/

# RUN npm config set cache-folder $YARN_CACHE && npm install
RUN yarn config set cache-folder $YARN_CACHE \
  && yarn install 

# Bundle the app source
COPY . .

# Compile TS to JS
RUN yarn build

FROM node:12.16.3-alpine as build

# Create app directory
ENV APP_DIR=/usr/app/api \
  YARN_CACHE=/tmp/ycache \
  NODE_ENV=$NODE_ENV

WORKDIR $APP_DIR

COPY --from=ts-build $APP_DIR/dist $APP_DIR/dist
COPY --from=ts-build $YARN_CACHE $YARN_CACHE
COPY --from=ts-build $APP_DIR/package.json $APP_DIR/package.json
COPY --from=ts-build $APP_DIR/yarn.lock $APP_DIR/yarn.lock
# COPY --from=ts-build $APP_DIR/.env $APP_DIR/.env

# Install app dependencies
RUN yarn install --prod --cache-folder $YARN_CACHE; rm -Rf $YARN_CACHE

# Production Image
FROM node:12.16.2-alpine

# Arguments
ARG NODE_ENV

# Configuration
ENV APP_DIR=/usr/app/api \
  NODE_ENV=production \
  SERVICE_PORT=3000

WORKDIR $APP_DIR

COPY --from=build $APP_DIR/ $APP_DIR/

EXPOSE $SERVICE_PORT

ENTRYPOINT [ "yarn", "start:prod" ]
