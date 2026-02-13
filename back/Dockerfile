FROM php:8.4
WORKDIR /api
#パッケージのインストール
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME="/opt/composer"
ENV PATH="$PATH:/opt/composer/vendor/bin"
RUN apt-get update \
    && apt-get install -y zip libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

    