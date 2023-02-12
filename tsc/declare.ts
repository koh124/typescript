// 型定義ファイル(.d.ts)について
// 自分のプロジェクトで型を宣言した場合はエディタの補完機能やコードチェックを行える
// しかし、npm経由で外部パッケージをインストールした場合は型定義ファイルが含まれているとは限らない

// 型定義ファイルは主にパッケージを配布する目的で作成される
// 型定義ファイルをパッケージに同梱することで、補完やコードチェックを行える

// ★型定義ファイルの出力
// 自分で宣言した型は、コマンドラインから出力して型定義ファイルを作成することができる
// $ tsc -d <*.ts>
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person): string {
  return "Hello, " + person.firstName + " " + person.lastName;
}

// ★型定義ファイルがあるパッケージの場合
// npm経由でインストールした時点でtypescriptでも使えるようになっている
// 例) moment.js
// $ npm install moment
// 問題なく利用できる
import moment from 'moment';

// ★型定義ファイルがあるが、別途インストールが必要
// このパターンが多い気がする
// $ npm install express --save
// $ npm install @types/express --save-dev
// import express from 'express';

// ★型定義ファイルがない場合
// 以下の2つの選択肢がある
// 1. anyで妥協する
// 2. 型定義ファイルを作る
