// keyof演算子
// オブジェクト型からプロパティ名を型としてユニオン型を生成することができる

// 考え方的には型の再利用と言える
// 例えばあるオブジェクトのキーの配列が欲しいとき、
// オブジェクトのキーを動的に取得した方が保守性が高く変更に強いコードになる
const obj = { a: 1, b: 2, c: 3 };
const arr = ["a", "b", "c"];
const keys = Object.keys(obj);

// keyofの特徴とメリット
// ・変更に強い、保守性の高いコードになる
// ・オブジェクト型のプロパティを変更したときに、自動的に整合性が保たれる
// ・プロパティ名が何十個もあるようなオブジェクトで、
//   そのプロパティ名のユニオン型を定義する必要が出てきた場合を考えると、恩恵が分かりやすい
// ・単体で使うよりも、Mapped Typesと組み合わせて使われることが多い

// プロパティを複数持つオブジェクトにkeyofを使うと、
// すべてのプロパティが property1 | property2 で返される（ユニオン型）
type ProgramLangs = {
  python: string,
  javascript: string,
  php: string
};
// 以下は同じ意味
type MyProgramLangs = keyof ProgramLangs;
type MyProgramLangs2 = python | javascript | php;

const python: MyProgramLangs = "python";
const javascript: MyProgramLangs = "javascript";
const php: MyProgramLangs = "php";
console.log(python, javascript, php);
// const java: MyProgramLangs = "java"; // NG

// オブジェクト型のプロパティはstring, number, Symbol型しか許容しない原則を考えると、
// Symbol型をkeyofのユニオン型の一部に含めることができる

// ...と思ったのだが、Symbol型をプロパティに指定することはできない？？
const strSymbol = Symbol("string symbol");
const numSymbol = Symbol(0);
type KeyOfStrNumSymbol = {
  str: "I'm string",
  0: "my property is number",
  strSymbol: "I'm string Symbol", // 変数のSymbol型はただのstringプロパティになってしまう
  numSymbol: "I'm number Symbol", // 同上
  // Symbol(0): "", // 構文エラー
  // Symbol: "" // 構文エラー
}

// 以下は同じ意味
type KeyOfUnion = keyof KeyOfStrNumSymbol;
type KeyOfUnion2 = 'str' | 0 | 'strSymbol' | 'numSymbol';

// keyofでユニオン型になった
const iamString: KeyOfUnion = "str";
const iam0: KeyOfUnion = 0;
const iamStrSymbol: KeyOfUnion = "strSymbol";
const iamNumSymbol: KeyOfUnion = "numSymbol";
// const iamHoge: KeyOfUnion = "st"; // Error: "st"をkeyofに割り当てることはできない
const iamHoge: KeyOfUnion = 1; // Error: 1をkeyofに割り当てることはできない
console.log(iamString);
console.log(iam0);
console.log(iamStrSymbol);
console.log(iamNumSymbol);
console.log(iamHoge);

// インデックス型にkeyofを使った際の注意点
// キーがstringのインデックス型にkeyofを使うと、stringではなく string | number が返る
type MapAny = {
  [K: string]: any
};

// 以下は同じ意味
type MapKeys = keyof MapAny;
type MapKeys2 = string | number;

// 直感的には理解しにくいかもしれないが、理解できればなんてことはない
// オブジェクトのプロパティにstringとnumberの同じ値を使用することはできない
// そしてオブジェクトの要素にアクセスする際に、obj[0]とobj['1']が同じになるから
const myobj = {
  0: "some value",
  // "0": "somevalue", // Error: Duplicate key '0'
};

// Mapped Typesとkeyofを組み合わせるとこうなる
type MapOfAxis = {
  [Key in "x" | "y" | "z"]: number
}
// 以下は同じ意味
type KeysOfAxis = keyof MapOfAxis;
type KeysOfAxis2 = "x" | "y" | "z";


// プロパティを持たないオブジェクトにkeyofを使うと、never型が返る
// 以下は同じ意味
type NoneKey = keyof {};
type NoneKey2 = never;

// any型にkeyofを使うと、string | number | symbol型が返る
// これは直感的にも理解しやすいかも
type AnyKeys = keyof any;
type AnyKeys2 = string | number | symbol
