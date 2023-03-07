(() => {

// 基本的な型注釈（Type Annotations）
const msg: string = "helloworld";
const price: number = 100;

// 関数の型定義
type Func = (arg: string) => void

// 関数の型注釈
const func: Func = (arg: string): void => {
  console.log(msg, price);
}
func("this argument is required with string")

// 関数を引数に取る関数の型注釈
type MyFunc = (func: Func) => string; // 関数の型定義
const myFunc: MyFunc = (func: Func) => "string" // 関数の型エイリアスを元に関数を定義
myFunc(func);

// これと同じ
const myFunc1: (func: (arg: string) => void) => string = (func) => {
  return 'string';
}
myFunc1(func);

// 配列の型注釈
const arr: string[] = ["a", "b", "c"];
const arr2: Array<string> = ["x", "y", "z"];

// 複合型を用いた配列の型注釈
const mixedArr: (string | number)[] = ["0", 0]; // ユニオン型
const mixedArr2: [string, number] = ["1", 1]; // タプル型

// オブジェクトの型注釈
const user: { name: string, age: number } = {
  name: "koh",
  age: 26
};

// オブジェクトのプロパティをオプショナルにする
const me: { name: string, age?: number } = {
  name: "kohei"
}

console.log(arr, arr2, mixedArr, mixedArr2, user, me);

})();


