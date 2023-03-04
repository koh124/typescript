// Mapped Typesの基本型
// type MappedTypes = {
//   [K in UnionSignature | string | number | Symbol]: string
// }

// インデックス型（Record型）のように、
// オブジェクトの型に対して任意のプロパティ名を許可するものだと、
// どのようなキーでも自由に設定できてしまう
// これは毎回アクセス時にvalueがundefinedかどうかの型チェックが必要ということを意味する
// 入力の形式が決まっているのであれば、MappedTypesの使用を検討することができる

type IceCreamFlavors = "chocolate" | "vanilla" | "strawberry" | "melon";

type SweetLevels = {
  [K in IceCreamFlavors]: number;
};

// ユニオン型のIceCreamFlavorsは4つのアイスの味の型セットである
// SweetLevelsはIceCreamFlavorsのいずれかまたは複数のフレーバーに対して、甘さのレベルを指定するオブジェクトの型である
// SweetLevels型のオブジェクトは、プロパティ名にこの4つのフレーバー以外の甘さのレベルを指定することはできない
const sweetLevelsOfIcecreamFlavors: SweetLevels = {
  "chocolate": 10, // OK
  "vanilla": 10, // OK
  "strawberry": 8, // OK
  "melon": 7 // OK
  // "lemon": 5 // NG "lemon"をSweetLevelsのキーに設定することはできない
};

// Readonly<T>ユーティリティ型もこの機能で実現されている。
// 【仕組み】
// 1. 型Typeのkeyofはオブジェクトのプロパティ名のユニオン型を返す
// eg) 'name' | 'age'
// 2. [Properties in 'name' | 'age']はユニオン型の要素をプロパティ名として展開する
// 3. 展開されたプロパティ名に対して、Type[Properties]で値にアクセスして型を定義する
// 展開されたPropertiesでオブジェクトのキー名を取得することができるため、これが可能になる
// 4. 各プロパティをreadonlyで読み取り専用にする
type ReadonlyUtilityClone<Type> = {
  readonly [Properties in keyof Type]: Type[Properties];
};

// Readonlyユーティリティ型のクローンを使ってみる
// 書き換え可能なオブジェクトの型を用意する
type WritableObj = {
  name: string;
  age: number;
}
// 読み取り専用にしてみる
type ReadonlyObj = ReadonlyUtilityClone<WritableObj>;

const writableObj: WritableObj = {
  name: 'koh',
  age: 26
};
const readonlyObj: ReadonlyObj = {
  name: 'koh',
  age: 26
}
writableObj.name = 'hey'; // OK: writable
writableObj.age = 27;     // OK: writable
readonlyObj.name = 'hey'; // NG: readonly
readonlyObj.age = 25;     // NG: readonly

// 本家
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// }

// Mapped Typesでユニオン型ではなくstring, number型などを指定した場合、
// インデックス型と同じになる
// これを踏まえると、任意のプロパティ名を展開するインデックス型に対して、
// 展開するプロパティを制限することができるのがMapped Typesだと考えることができる
// eg) [K: string] = [K in string] これが [K in "a" | "b" | "c"] こうなる
type KeyOfString = {
  [K in string]: string
}
type KeyOfString2 = {
  [K: string]: string;
}

// Mapped Typesはプロパティ名を追加できないという制約がある
type KeyValues = {
  [K in string]: string;
  // name: string; // プロパティを追加できない
}
// インターセクション型を使うと、追加のプロパティ名を定義できる
type Name = {
  name: string;
}
type KeyValuesAndName = KeyValues & Name
