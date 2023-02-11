
## 環境変数

/.env
|name|description|
|---|---|
|IMAGE_HOST|カード画像の取得先|

/devenv/.env
|name|description|
|---|---|
|S3_BUCKET_NAME|カード画像のアップロード先|


## 開発環境構築

以下でバックエンド環境立ち上げ。TODO:カード画像のアップロードができてない
```
cd devenv
sh init.sh
```

プロジェクトのルートで`npm run dev`で立ち上がります。
