★tsconfig.jsonを設定する
node.jsはそれ自体がTypescriptをサポートしているわけではないため、TypeScriptを導入するときはTypeScriptの設定ファイルであるtsconfig.jsonが必要になる

<!-- tsconfig.jsonを生成する -->
$ npx tsc --init

各項目の説明
・target
JSにコンパイルした際にどのバージョン向けに出力するかを決める
targetを設定すると、TypeScriptはそのtargetの時点で使用できるオブジェクト、関数の定義ファイルなどを読み込む。
あまりにも古いバージョンのtargetを指定すると最近のモダンなオブジェクトや関数を使うことができないし、最新にしても動作する環境が古いままだと使うことはできない。

typescriptはコーディング中はあたかもそのオブジェクト、関数があるかのように入力補完を行うが、実際に動くjsの実行環境がそのバージョンのオブジェクトや関数を持っているかどうかは別問題。

例えば、"target": "es5"にするとレガシーなES5向けにコンパイルを行うが、
アロー関数などの"es2015"から使える構文をES5でも動くfunction() {}形式にコンパイルしてくれる

もうすぐ2023年になる現在だと、es2022にしておけば無難？

★ESLintを導入する
・パッケージのインストール
npm install --save-dev @typescript-eslint/eslint-plugin eslint\ eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n\ eslint-plugin-promise eslint-plugin-react eslint-plugin-strict-dependencies\
eslint-plugin-unused-imports eslint-config-prettier prettier\

・eslintrc.jsの追加

----------docs----------

React + TypeScript + Jest開発環境の構築

実装

・TypeScript

【導入方法】

パッケージをインストール
```
// @typesはTypeScript用のreactの型定義情報
$ npm install typescript ts-loader @types/react @types/react-dom
```

TypeScriptコンパイラの設定ファイルの作成
```
$ npx tsc --init

// tsconfig.jsonで追記
"jsx": "react"
```

webpack.config.jsのエントリーポイントとrulesの記述を変更する

```
entry: 'path/to/typescript.tsx',
module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    },
  ]
}
```

・Jest

パッケージをインストール
```
// jsだけならJestのみでテストできる
// ts-jestはJestをTypeScriptに対応させるもの
// @types/jestはJestのAPIの型定義ファイル
$ npm install jest ts-jest @types/jest
```

Jestの設定ファイルを作る
```
// jest.config.jsを生成する
// JestでTypescriptをテストできるようにする設定ファイル
$ yarn ts-jest config:init
```

__test__ディレクトリの中にあるか、*.test.tsがテストファイルの命名規則

テストを実行する
```
$ npm test
```
