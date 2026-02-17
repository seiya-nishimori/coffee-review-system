
環境構築が終わったので、画面表示をしていきたい。

【環境構築参考記事】
https://zenn.dev/amethyst/articles/1af8a05074fa2f

【URL】
アクセス
実行後、http://localhost:3333 と　http://localhost:9000 にアクセスできたら成功です。

【注意】
今回のReactとLaravelの環境構築は、フロントとバックエンドでURLが別々なので、どういう感じで画面の動作確認をやっていくかを
意識しながら注意する



【コマンド実行ログ】

1. なぜファイルがないのか？（最新のロジック）
従来のLaravelでは最初からAPI用の設定ファイルがありましたが、最新のLaravel 11では「APIを作りたい人だけがコマンドを打って追加する」という軽量化された仕組みになっています。

2. 最短解決策：API機能をインストールする
以下のコマンドを打つだけで、消えた api.php が出現し、さらにAPIに必要な設定も一瞬で自動完了します。

手順：
バックエンドのコンテナに入る（まだ入っていなければ）

Bash
docker compose exec back bash



APIインストールコマンドを実行する

Bash
php artisan install:api


