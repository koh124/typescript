// ★型の再利用
// Typescriptでは既存の型を再利用して、新たな別の型を導き出す機能がある。

// あるオブジェクトのキーの配列がほしいとき、
// keys1よりkeys2の方が保守性が高く、変更に強いコードになる
const obj = { a: 1, b: 2, c: 3 };
const keys1 = ["a", "b", "c"];
const keys2 = Object.keys(obj);

// Typescriptには変数の再利用の型バージョンがある。
// 型の再利用と言える

// ★keyof演算子
// keyof演算子を使うと、オブジェクト型からプロパティ名を型として返すことができる
type Person = {
  name: string;
}
type PersonKey = keyof Person;
// type PersonKey = 'name'

// 2つ以上のプロパティがあるオブジェクト型にkeyofを使うと、
// すべてのプロパティ名がユニオン型で返される
type Book = {
  title: string;
  price: number;
  rating: number;
};
// 次の2つは全く同じ意味になる
type BookKey = keyof Book;
type BookKey2 = "title" | "price" | "rating";

// インデックス型にkeyofを使うと、インデックスキーの型が返る
type MapLike = {
  [K: string]: any
};
type MapKeys = keyof MapLike;
// type MapKeys = string | number
// キーがstringのインデックス型は、stringではなく string | number が返る
// number型のキーアクセスのobj[0]とobj['1']は同じ意味になるから...らしい

// Mapped Types keyofを使うと、そのキーの型が返る
type MapLike1 = { [K in "x" | "y" | "z"]: any };
type MapKeys1 = keyof MapLike;
// type MapKeys = "x" | "y" | "z"

// プロパティを持たないオブジェクトにkeyofを使うと、never型が返る
type What = keyof {};
// type What = never

// any型にkeyofを使うと、string | number | symbol型が返る
type AnyKeys = keyof any;
// type AnyKeys = string | number | symbol

// keyofのメリット
// keyofを使った方が変更に強い、保守性の高いコードになる
// オブジェクト型のプロパティを変更したときに、自動的に整合性が保たれる
// プロパティ名が何十個もあるようなオブジェクトで、
// そのプロパティ名のユニオン型を定義する必要が出てきた場合を考えると、恩恵が分かりやすい
// keyofは単体で使うよりも、Mapped Typesと組み合わせて使われることが多い
type Coffee = {
  name: string;
  price: number;
};
type CoffeeKey = keyof Coffee;
type CoffeeKey2 = "name" | "price";

// ★typeof演算子
// Typescriptのtypeofは、変数から型を抽出する型演算子
const point = {
  x: 135, y: 200
};
type Point = typeof point;
// type Point = {
//   x: number;
//   y: number;
// }

// Typescriptのtypeof型演算子はJavaScriptのtypeofと同名だが、
// 全くの別物なので注意する必要がある

// ★ユーティリティ型(utility type)
// ユーティリティ型は、ある型から別の型に変換してくれる型
// ユーティリティ型は、型の世界の関数のようなもの

// ・Required型
// Required<T>は、Tのすべてのプロパティからオプショナルであることを意味する?を取り除くユーティリティ型
type Food = {
  name: string,
  price?: number
}
// Food型はpriceの入力が任意
const meat: Food = {
  name: 'サーロイン'
}
// priceの入力がrequiredになっている
type RequiredFood = Required<Food>;
const fish: RequiredFood = {
  name: 'サバ',
  price: 200
}

// ・Readonly型
// Readonly<T>は、オブジェクト型Tのプロパティをすべて読み取り専用にするユーティリティ型
// 型引数Tにはオブジェクト型を指定する
const carrot = {
  name: 'にんじん',
  price: 200
};
carrot.price = 100;
type ReadonlyFood = Readonly<Food>;
const tomato: ReadonlyFood = {
  name: 'トマト',
  price: 200
}
// これと同じ意味になる
// const tomato = {
//   readonly name: 'トマト',
//   readonly price: 200
// }
// tomato.price = 100 // 読み取り専用プロパティは不変になる

// ちなみに、JavaScriptのconstは再代入を禁止とするが、
// オブジェクトのプロパティやメソッド、配列の要素などを書き換えることを禁止にはしない
// つまりオブジェクトや配列のconstはミュータブルということ

// Readonlyの効果は再帰的ではない
// Readonly<T>が読み取り専用にするのは、オブジェクト型Tの直下のプロパティのみ
// したがって、プロパティがオブジェクトだった場合、それが持つプロパティまでは読み取り専用にならないので、注意する必要がある

// ・Exclude型
// Exclude<T, U>は、ユニオン型TからUで指定した型を取り除いたユニオン型を返すユーティリティ型
// T: ユニオン型
// U: Tから取り除きたい型
type Rank = "S" | "A" | "B" | "C" | "D";
type PassRank = Exclude<Rank, "C" | "D">;
// type PassRank = "S" | "A" | "B"
