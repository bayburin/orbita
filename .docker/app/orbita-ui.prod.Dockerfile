# FIRST STAGE
ARG NODE_MAJOR
FROM docker-hub.iss-reshetnev.ru/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim as orbita-ui-compile

ARG YARN_VERSION
ARG APP_ROOT

ENV DEBIAN_FRONTEND noninteractive

# Common packages
RUN apt-get update -qq && apt-get install -yq --no-install-recommends \
  gnupg2 \
  curl \
  wget \
  ca-certificates \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# YARN
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Install dependencies
RUN apt-get update -qq && apt-get -yq dist-upgrade \
  && apt-get install -yq --no-install-recommends \
  yarn=${YARN_VERSION}-1 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install nx
RUN yarn global add nx

# Create app folder
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

# Install packages
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN nx build orbita-ui --configuration=staging

# SECONDS STAGE
FROM nginx:1.20.1-alpine

ARG APP_ROOT
ENV APP_ROOT ${APP_ROOT}

ARG APP_HOSTNAME
ENV APP_HOSTNAME ${APP_HOSTNAME}

# Create app folder
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

# Copy files
COPY --from=orbita-ui-compile ${APP_ROOT}/dist/apps/orbita-ui ${APP_ROOT}
COPY .docker/nginx/orbita-ui.prod.conf /tmp/nginx.prod.conf
COPY .docker/tls/ /etc/pki/tls/nginx/

RUN envsubst '$APP_ROOT $APP_HOSTNAME' < /tmp/nginx.prod.conf > /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

STOPSIGNAL SIGTERM
