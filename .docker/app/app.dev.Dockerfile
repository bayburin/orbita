ARG NODE_MAJOR
FROM docker-hub.iss-reshetnev.ru/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim

ARG YARN_VERSION
ARG APP_ROOT

ENV TZ=Asia/Krasnoyarsk
ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU:ru
ENV LC_ALL ru_RU.UTF-8

ENV DEBIAN_FRONTEND noninteractive

# Common packages
RUN apt-get update -qq && apt-get install -yq --no-install-recommends \
  gnupg2 \
  curl \
  wget \
  ca-certificates \
  git \
  locales \
  tzdata \
  apt-file \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# YARN
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Set RU locale
RUN sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
  dpkg-reconfigure locales && \
  update-locale LANG=ru_RU.UTF-8 && \
  locale-gen ru_RU.UTF-8 && \
  dpkg-reconfigure locales

# Install dependencies
RUN apt-get update -qq && apt-get -yq dist-upgrade \
  && apt-get install -yq --no-install-recommends \
  yarn=${YARN_VERSION}-1 \
  vim \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install nx
RUN yarn global add nx

# Create app folder
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

EXPOSE 4200

STOPSIGNAL SIGTERM
