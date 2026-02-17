
コマンド入力した順番やインストールしている技術や使用している技術などを記載する場所です
今回のプロジェクトの目的は、ReactとLaravelを元に環境構築の理解を深めて、READEME.mdの記載の学習、GitHubのコマンド入力の理解などを深めていくことが目的です。

ReactとLaravelの環境構築をしています。

参考Webサイト(ReactとLaravel)
https://zenn.dev/amethyst/articles/1af8a05074fa2f

随時キリのいいタイミングでGitHubに挙げてコメント入れる（GitHubは公開か非公開か？どっち？）


【動作確認】
 最終確認：以下の2つのURLをブラウザ（Chromeなど）で開いてみてください。

Laravel（脳）http://localhost:9000
Laravelの初期画面（さきほどのエラーが消えているはず！）

見えるべきものReact（顔）http://localhost:3333
Vite + React の画面


【環境構築疑問点】
Dockerのフォルダ構造が



【環境構成】
フォルダをフロントとバックに分けて作ってます。
Dockerファイルはフロントとバックで１枚つづ計２枚。
ymlファイルは１枚。
React（ライブラリ）をインストール。
Tailwind（CSSフレームワーク）は使えるかまだコマンドで確認してないけど、暇なら入れる予定。

す！ついにバックエンド（Laravel）とデータベース（PostgreSQL）の連携が成功しましたね。

DONE と表示されたのは、LaravelがPostgreSQLの中に「ユーザー管理」や「キャッシュ管理」のためのテーブルを無事に作成できた証拠です。これで、データの保存や読み込みができる準備が整いました。

今の状況まとめ
フロント（React）: 起動中（3333番ポート）

バック（Laravel）: 起動中（9000番ポート）

DB（PostgreSQL）: 起動中＆テーブル作成完了





【考え】
環境構築はWebの記事をメインで開発して、AIも併用して進めるのが現時点ではベストと考えいる。
全ファイルだけでなく、１ファイルをGitHubに挙げる練習をして見てもいいかも。

【現在課題点】

テスト用で画面確認を作って表示してもいいかも



【進捗具合】

終わり
これにて環境構築は終わりです。

テスト用で画面確認を作って表示してもいいかも



【設定項目】
PostgreSQL（pgsql） に接続しに行っています。(ymlに記載してる)


【注意事項】
node_modulesは、システムや環境を動かしたり、npmコマンドを使用したりするときに必要なのでnodeを使ってないからという理由などで勝手に消さない。

環境構築時にAIがこのURLでアクセスしたら表示されますって言ってたら、それはまだ表示されない状態。何故ならWebサイトの参考記事でフロントとバックで分かれてる部分ごとで最後まで終わらないと表示されないから。（コマンド打ってエラー出たらそこだけ解析して修正していく）


✅Reactの環境構築は完了です


現在はLaravelの環境構築中です！


【コマンド履歴】

1. コンテナを起動する（基本）
まずはこれです。バックグラウンドで起動し、設定変更も反映させます。

PowerShell
docker compose up -d --build
-d: バックグラウンドで実行（ターミナルを占領しない）

--build: 設定ファイル（Dockerfileなど）の変更を反映して作り直す


2. 状態を確認する（動いてる？）
立ち上げた後、本当に動いているか、エラーで止まっていないか確認します。

PowerShell
docker compose ps
STATUS が Up または Running になっていれば成功です。

もし Exit (1) などになっていたら、何らかのエラーで落ちています。

中身を直接確認します！

PowerShell
ls ./front


了解しました！現在のエラーは docker-compose.yml が見ている場所と、実際のファイルの場所がズレているのが原因です。

既存のファイルを一度整理してから、正しい場所に作り直しましょう。以下のコマンドを順番に貼り付けて実行してください。

1. 既存のファイルを削除して場所を整える
まず、中途半端な場所にあるファイルを消して、front ディレクトリをきれいにします。

PowerShell
# frontディレクトリに移動
cd D:\dev\coffee-review-system\front

# 既存のDockerfileを削除（念のため）
rm Dockerfile


2. 正しい Dockerfile を作成する
次に、その場所（front の中）で新しく Dockerfile を作成します。以下のコマンドをそのまま貼り付けてエンターを押してください。

PowerShell
# Dockerfileを作成して中身を書き込む
@"
FROM node:22
WORKDIR /app/react-app
COPY ./react-app/package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
"@ | Out-File -FilePath Dockerfile -Encoding ascii



Dockerファイル内（フロント）コード

FROM node:22
WORKDIR /app/react-app
COPY ./react-app/package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]


3. ルートに戻って再起動
最後に、プロジェクトのルート（一番上の階層）に戻って、Dockerを立ち上げ直します。

PowerShell
# ルートディレクトリに戻る
cd ..

# 完全にリセットしてビルドし直す
docker compose down
docker compose up -d --build



上記でフロントの中にDockerファイルがちゃんと反映されてる！コマンドにて確認済



【laravelプロジェクトの作成】

再度コンテナを立ち上げた後、以下を実行

docker compose run back bash
composer create-project laravel/laravel laravel-app

composer create-project laravel/laravel ディレクトリ名で作成します。
今回はlaravel-appという名前でディレクトリを作成します。


1. 既存のフォルダを削除する（PowerShell用）
PowerShell
Remove-Item -Recurse -Force back/laravel-app
-Recurse: 中のファイルも全部消す（Linuxの -r と同じ）

-Force: 読み取り専用ファイルなども強制的に消す（Linuxの -f と同じ）



2. 再度コンテナの中に入ってインストールする
フォルダが消えたら、改めてコンテナに入って Laravel を作り直します。

PowerShell
# 1. コンテナに入る
docker compose run back bash

# 2. コンテナの中で実行（ここは Linux コマンドなのでこのままでOK）
composer create-project laravel/laravel laravel-app

# 3. 終わったら抜ける
exit



【dockerfileの編集】
laravelプロジェクトが作成されたらDockerfileを以下のように編集します。

back/Dockerfile
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
#以下の内容を追記
COPY . .
WORKDIR /api/laravel-app
RUN composer install
CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]
EXPOSE 8000

これでコンテナを起動したらlaravelが立ち上がるようになりました。
docker compose up -d --buildを実行後、 http://localhost:9000 にアクセス出来たら成功。


【DBの設定】

docker-compose.ymlに以下の内容を追記

docker-compose.yml
services:
  front:
    build: ./front
    ports:
      - 3333:5173
    volumes:
      - ./front/react-app:/app/react-app
      - /app/react-app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
  back:
    build: ./back
    volumes:
      - ./back:/api
    ports:
      - 9000:8000
  #追記
  db:
    image: postgres:15
    volumes:
      - ./back/laravel-app/postgre_DB:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      POSTGRES_DB: dev
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

DB設定に関しては各自設定してください。
編集後、docker compose up -d --buildを実行し、laravel-appの中にpostgre_DBが作成されたら成功。

!
postgre_DBディレクトリは.gitignoreに含めといてください


【.envの編集】
back/laravel-app/.env
#編集
DB_CONNECTION=pgsql
DB_HOST=db #docker-composeのサービス名にあたる部分。
DB_PORT=5432 #5432固定でいい
DB_DATABASE=dev #POSTGRES_DBと一致させる。
DB_USERNAME=user #POSTGRES_USERと一致させる。
DB_PASSWORD=password #POSTGRES_PASSWORDと一致させる。s

編集後、docker-compose run back bashでコンテナの中に入り、
php artisan migrateが実行できたら成功。
これで、laravelとReactのプロジェクトは完成です。



1. .env ファイルを書き換える
Windows側のエクスプローラーで D:\dev\coffee-review-system\back\laravel-app\.env を開いてください。 11行目あたりにある DB_CONNECTION から始まる設定を、以下のように書き換えて保存してください。

コード スニペット
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=coffee_db
DB_USERNAME=user
DB_PASSWORD=password
ここがポイント！

DB_HOST=db: Docker ComposeでDBコンテナの名前を db にしているので、ここも db と書くことで繋がります。

DB_CONNECTION=pgsql: PostgreSQLを使うための指定です。



2. 設定のキャッシュを消す
Laravelが古い設定（SQLite）を覚えたままになっていることがあるので、今のコンテナの画面（root@09f6373f9b14:/api/laravel-app#）で以下のコマンドを打ってください。

Bash
php artisan config:clear
3. 再度マイグレーション（テーブル作成）
準備が整いました。もう一度実行しましょう！

Bash
php artisan migrate


【.envの編集】
back/laravel-app/.env
#編集
DB_CONNECTION=pgsql
DB_HOST=db #docker-composeのサービス名にあたる部分。
DB_PORT=5432 #5432固定でいい
DB_DATABASE=dev #POSTGRES_DBと一致させる。
DB_USERNAME=user #POSTGRES_USERと一致させる。
DB_PASSWORD=password #POSTGRES_PASSWORDと一致させる。s

編集後、docker-compose run back bashでコンテナの中に入り、
php artisan migrateが実行できたら成功。
これで、laravelとReactのプロジェクトは完成です。


.envの編集。

編集後、docker-compose run back bashでコンテナの中に入り、
php artisan migrateが実行できたら成功。
これで、laravelとReactのプロジェクトは完成です。


php artisan migrate： その設計図を読み込んで、実際にデータベースの中に「テーブル」を作る実行コマンド




1. 最終確認：勝利の画面を見に行こう以下の2つのURLをブラウザ（Chromeなど）で開いてみてください。

【確認先】

Laravel（脳）http://localhost:9000
Laravelの初期画面（さきほどのエラーが消えているはず！）

見えるべきものReact（顔）http://localhost:3333
Vite + React の画面