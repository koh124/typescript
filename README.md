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

★Linter, Formatterとは
Linterはコードの静的解析ツール
コーディング規約に則っているかチェックしてくれる
ルール違反があるとエラー、警告を表示してくれる
潜在的なバグの発見に役立つ

eg:
・ESLint: Javascript/Typescript
・Stylelint: CSS

Fomatterはコードの整形ツール
スペース、インデント、改行等を一定のコーディング規約に従うようにBeautifyしてくれる
eg: Prettier

★ESLintを導入する
・パッケージのインストール
npm install --save-dev @typescript-eslint/eslint-plugin eslint\ eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n\ eslint-plugin-promise eslint-plugin-react eslint-plugin-strict-dependencies\
eslint-plugin-unused-imports eslint-config-prettier prettier\

・eslintrc.jsの追加
npx eslint --initで対話的にESLint構成を作成

・ESLintの実行
npx eslint index.ts

★Prettierを使う
npx prettier --write index.ts

----------メモ----------

・npx eslint index.tsでESLintを実行できるが、こんな感じのエラーが出る

Error: Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.

★解決

eslintrc.jsに記述
```
parserOptions: {
  project: ['./tsconfig.json']
}

//tsconfig.eslint.jsonに追記する場合
parserOptions: {
  project: ['./tsconfig.eslint.json']
}

tsconfig.eslint.json
{
  "extends": "./tsconfig.json", //tsconfig.eslint.jsonでtsconfig.jsonを読み込む
}
```

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
