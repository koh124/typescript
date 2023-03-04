// Construct a type with a set of properties K of type T
// type MyRecord = Record<key, Type>;
// type Record<K extends string | number | symbol, T> = {
//   [P in K]: T;
// }
type MyClassNames = Record<string, string>;

// css modulesのdeclaration
// →Record<string, string>
// →css modulesでインポートするとこうなる
// {
//   myClassName: 'hogehoge_abcdef1234'
// }

// 同じ意味
// ↓ESLintはインデックス型よりもRecord型を使うことを推奨してる
// A record is preferred over an index signature.
type Hoge = Record<string, string>
type Foo = {
  [K: string]: string
}
// ただし、Record型またはインデックス型には以下の制約がある
// key: string ｜ number ｜ symbol
// →キーはオブジェクトのプロパティなのだから当然と言える

// ちなみにRecord型のようなプリセットされた型のことをユーティリティ型と言う
// また、[K: string]のことをインデックス型（index signature）ともいう
