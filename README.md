# WOFFアプリケーション

このプロジェクトは、React + TypeScript + Viteを使用したWOFFサンプルアプリケーションです。

WOFFとは
https://developers.worksmobile.com/jp/docs/woff-guide

## 開発環境のセットアップ

0. 事前準備
LINE WORKS Developer Consoleにて、WOFFアプリを登録しWOFF_IDを取得してください。

https://developers.worksmobile.com/jp/docs/woff-guide#create-woff-app


1. リポジトリのクローン
```bash
git clone https://github.com/1411381/WOFF-Sample-App.git
cd WOFF-Sample-App
```
2. envの設定

ルート直下に .envファイルを作成し、LINE WORKS Developer Consoleで作成したWOFFアプリのWOFF_IDを登録してください。

```.env
VITE_WOFF_ID= {{woffid}}
```

3. 依存関係のインストール
```bash
npm init -y
npm install
```

4. 開発サーバーの起動
```bash
npm run dev
```


## Azure Static Web Appでの実行

Azure Static Web App( SWA )の作成方法は以下を参考ください。
※　以下工程は、Github Actionsを用いたbuildを前提としています。

https://learn.microsoft.com/ja-jp/azure/static-web-apps/deploy-react?pivots=github


SWAを作成後、Github ActionsのyamlにWOFF_IDを設定する。

一部抜粋
```yml
...
jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    env:
      VITE_WOFF_ID: {{woff_id}}
      ...
```