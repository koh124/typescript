// ★型注釈（Type Annotations）
{
  const msg: string = 'Hello, World!';
  console.log(msg);

  // string型のmsgをnumber型の制約があるmsgNumに代入するとコンパイルエラー
  const msgNum: number = msg;

  // 関数の引数で型を制限してもコンパイルエラーになる
  const sayMsg = (msg: number) => {
    console.log(msg);
  };
  sayMsg(msg);

  // 関数の戻り値に型制約をつけることもできる
  const returnMsg = (msg: string): string => {
    return msg;
  };
  returnMsg(msg);
}

// ★配列

// 配列の要素の型を制限できる
// ジェネリクスを用いて表現することもできる
const arr: string[] = ['hello', 'string', 'array'];
const arr2: Array<string> = ['hello', 'generics', 'array'];

// 複合型を要素に含む配列は、Union型やタプルを用いて表現できる
const mixedArr: (string | number)[] = ['hello', 1]; // Union型
const mixedArr2: [string, number] = ['hello', 2]; // タプルを用いた

// ★オブジェクト型
{
  const user: {name: string, age: number} = {
    name: 'John',
    age: 20
  };

  // オブジェクトのプロパティにオプショナルな設定をすることができる
  const helloUser = (user: {firstName: string, lastName?: string}) => {
    return user;
  }
  helloUser({ firstName: 'Jane', lastName: 'Doe' });
  helloUser({ firstName: 'Jane' });
  helloUser({ lastName: 'Alpha' }); // オプショナルでないプロパティを省略するとエラー
}
