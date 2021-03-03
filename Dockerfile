FROM php:7.4-fpm

ARG user
ARG uid

RUN apt-get update && apt-get install -y \
  git curl \
  libpng-dev libonig-dev libxml2-dev \
  zip unzip \
  wget \
  gnupg2

RUN echo "deb https://deb.nodesource.com/node_14.x jessie main" >> /etc/apt/sources.list.d/nodejs.list && \
  wget -nv -O -  https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb-src https://deb.nodesource.com/node_14.x jessie main" >> /etc/apt/sources.list.d/nodejs.list && \
  apt-get update

RUN apt-get install -y nodejs && \
  rm -f /etc/apt/sources.list.d/nodejs.list

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn apt-key add - && \
  echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && \
  apt-get install --no-install-recommends yarn

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
  chown -R $user:$user /home/$user

WORKDIR /var/www

USER $user
