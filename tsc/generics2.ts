// ★ジェネリクス
// ジェネリクスを使うと型の引数を使うことができる
const sayHello = <T>(msg: T) => {
  console.log(msg);
};
sayHello('Hello!');

// もちろん、型引数は複数与えることができる
const multiTypes = <S extends string, N extends number, B extends boolean>(str: S, num: N, bool: B): string | number => {
  if (bool) {
    return str;
  } else {
    return num;
  }
};
multiTypes<string, number, boolean>('hello', 1, true);

// ★ジェネリクスのメリット
// 一般的に、コードの共通化とコードの安全性の確保の両立は難しい
// 型を厳密に指定すれば、コードの安全性は確保できるが、同じようなコードが量産される
// 型を指定しなければ（any）コードの再利用性は高まるが、安全性が失われる
// ジェネリクスはこの問題を解決する

// ★extends
// extendsキーワードでジェネリクスに型制約を与えることもできる
// extendsで型制約を与えると、型引数Tは指定した型またはそのサブタイプであることが保証される
type myString = string;
const sayHello2 = <T extends string>(msg: T) => {
  console.log(msg);
};
sayHello2('Hello, World!');
sayHello2(1); // コンパイルエラー

// ただし、TypeScriptではサブクラスとサブタイプは明確に区別されている
// したがって、型引数のサブクラス型に対しても同様に型制約が期待できるわけではない
// サブクラスを制約にした場合は、親クラスでも許可された。
// これは仕様を確認してみると分かりやすい。

// 試しに親クラスとサブクラスを作ってみる
class Test {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class MathTest extends Test {
  constructor(name: string) {
    super(name);
  }
}
const parentMathTest = new Test('math');
const subMathTest = new MathTest('math');

// MathTestクラスのインスタンスは親クラスであるTestを継承しているようだ
console.log(parentMathTest instanceof Test);
console.log(parentMathTest instanceof MathTest);
console.log(subMathTest instanceof Test);
console.log(subMathTest instanceof MathTest);

// ジェネリクスで型にクラス制約を与えると、サブクラスが許可されていることは確認できた
const printTest = <T extends Test>(test: T): void => {
  console.log(test.name);
};
printTest(new MathTest('math')); // サブクラスはOK

// 問題はここ。
// どうやら、サブクラス制約は、親クラスのインスタンスでも許可する模様
const test: MathTest = new Test('math');
console.log(test.name);

// ★型変数
// class, string, number, booleanなどの予約語を型引数名にすることはできない
// 型引数はあくまで型の変数という立場であり、予約語を変数名にすることはできない
// 例えば、<class>、<string>、<boolean>などの型引数を与えると失敗する
const App = <bool>(flag: bool) => {
  return '';
};
App(true)

// ★デフォルト型引数
type MyErrorEvent<T = Error> = {
  error: T;
  type: string;
}

// Errorクラスを継承したValueErrorクラスを作成する
class ValueError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name; // これでクラス名（ValueError）を保持することができる
  }
}
console.log((new ValueError('値エラー')).name);

// 変数errorEventはMyErrorEvent型のオブジェクトになった
// MyErrorEventは型引数Errorを受け取り、errorプロパティがErrorクラスの制約を受けることを保証している
const errorEvent: MyErrorEvent<Error> = {
  error: new Error('エラーです'),
  type: 'syntax'
};

// valueEventでも同様にジェネリクスでValueErrorクラスを渡せば、ValueErrorクラスの制約を受けることはできる
// だが毎回やるのは面倒
const valueEvent: MyErrorEvent<ValueError> = {
  error: new ValueError('値に誤りがあります'),
  type: 'value'
};

// デフォルト型引数を使うことで、この問題を解決することができる
const error: MyErrorEvent = {
  error: new Error(),
  type: 'default error'
};

// ★デフォルト型引数とextendsの合わせ技
// 型引数TはErrorクラスのサブタイプであることを保証しつつ
// 型引数が省略された場合はTはデフォルトのValueErrorの制約を受ける
type MyCombinedEvent<T extends Error = ValueError> = {
  error: T;
  type: string;
}

// ジェネリクスをMyCombinedEvent型に与えると
// Errorクラスのサブタイプである制約を受けつつ
// 受け取った型をerrorプロパティに設定できる
const valueError: MyCombinedEvent<SyntaxError> = {
  error: new SyntaxError('シンタックスエラー'),
  type: 'シンタックスエラー',
};

const defaultError: MyCombinedEvent = {
  error: new ValueError('値エラー'),
  type: '値エラー'
}

// ★デフォルト型引数をジェネリクスで指定する
// デフォルト型引数は左から順番に解析されるので、順番を間違えなければジェネリクスで型引数を参照できる
// extendsでstrAは文字列であることが保証されていて、BとCは三段論法でstrA型であることが保証される
// したがって引数はすべて文字列型になる
function Example<strA extends string, B = strA, C = B> (a: strA, b: B, c: C): string {
  if (typeof b === 'string' && typeof c === 'string') {
    console.log(a)
  }
  return a;
}
Example('この', '関数は', '文字列を返します');
