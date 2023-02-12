// ジェネリクス（generics）は型の引数
// 一般に型の安全性とコードの共通化の両立は難しい
// どちらかを取ればどちらかは損なわれることが多い

// 型を指定しなければ再利用性が高まるが、コードの安全性が損なわれる
function chooseRandomlyAny(v1: any, v2: any): any {
  return Math.random() <= 0.5 ? v1 : v2;
}
let str = chooseRandomlyAny(0, 1);
// str = str.toLowerCase(); // コンパイルエラーは発生しないのに、実行するとエラー

// 型を指定することでコードの安全性は保たれるが、同じようなコードが量産される
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomlyString(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}

// 【ジェネリクスで解決】
// 五分五分で抽選を引き当てるコード
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}

type URLstr = string;

interface myURL {
  url: string
}

const urlA = { url: 'https://typescriptbook.jp/reference/generics' };
const urlB = { url: 'https://typescriptbook.jp/reference/' };

chooseRandomly<string>('勝ち', '負け');
chooseRandomly<number>(1, 2);
chooseRandomly<URLstr>(
  'https://typescriptbook.jp/reference/generics',
  'https://typescriptbook.jp/reference/'
  )
chooseRandomly<myURL>(urlA, urlB);

// ★extendsキーワード
// extendsキーワードはジェネリクスの型引数に制約をつけることができる
// extendsをつけることで、型引数は指定した型またはそのサブタイプであることが保証される

// 型の引数は複数割り当てることもできる
// SとNは型変数名を決めているに過ぎない
// そのため、型Sと型Nはextendsを指定しないと戻り値の型制約を満たしていることが保証できない
function sample<S extends string, N extends number, B>(str: S, num: N, bool: B): string | number {
  if (bool) {
    return str;
  } else {
    return num;
  }
}
// ここの実引数ではあくまでstring, number, boolean型を"渡しただけ"であり、
// 関数内部で静的に戻り値がstring | number制約を満たしていることは保証されない
// したがって、型Sと型Nはそれぞれstring型とnumber型に属することを教えてやらなければならない
sample<string, number, boolean>('str', 1, true);

// ★型変数
// class, string, number, booleanなどの予約後を型引数名にすることはできない
// 型引数はあくまで型の変数という立場であり、予約後を変数名につけることはできない
// <class> <number> <string> このような名前を型引数に指定すると失敗する
function App<bool>(a: bool): string {
  return ''
}

// ★デフォルト型引数
// 発生したエラーイベントとその種類を文字列で保持する型を定義する
type MyErrorEvent<T = Error> = {
  error: T;
  type: string;
}

// 新しくネットワークエラーイベントを作成する
class NetworkError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

// こんな感じで、MyErrorEvent型は使い回せる
const errorEvent: MyErrorEvent<Error> = {
  error: new Error('エラーです'),
  type: 'syntax'
}

const networkErrorEvent: MyErrorEvent<NetworkError> = {
  error: new NetworkError('ネットワークエラーです'),
  type: 'network'
}

// だが、毎回型引数にErrorを渡すのは面倒...
// そこで、デフォルト型引数が使える
const errorEventDefault: MyErrorEvent = {
  error: new Error('エラーです'),
  type: 'syntax'
};

const networkErrorEventDefault: MyErrorEvent<NetworkError> = {
  error: new NetworkError('ネットワークエラーです'),
  type: 'network'
}

// ★extendsキーワードの型引数の制約とデフォルト型引数の合わせ技
// 型TはError型またはError型のサブクラスであることを保証しつつ、
// 型引数を省略したときはSyntaxErrorとして扱われる
type MyCombinedErrorEvent<T extends Error = SyntaxError> = {
  error: T;
  type: string;
}

// Errorクラスを継承したNetworkErrorを型引数に渡す
const NetworkErrorEventWithoutDefaultTypeArg: MyCombinedErrorEvent<NetworkError> = {
  error: new NetworkError('ネットワークエラーです'),
  type: 'ネットワークエラーです'
}

// デフォルト型引数がSyntaxError
const SyntaxErrorEventWithExtendsAndDefault: MyCombinedErrorEvent = {
  error: new SyntaxError('シンタックスエラー'),
  type: 'シンタックスエラーです',
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

