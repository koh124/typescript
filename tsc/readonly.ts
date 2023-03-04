// Readonly型（ユーティリティ型）
// ReadonlyはオブジェクトT直下のプロパティすべてを読み取り専用（イミュータブル）にする。
// この効果は再帰的ではないため、オブジェクトの直下のプロパティにしか効果がない。
// syntax: Readonly<T>

type classNames = Record<string, string>;

// 以下の2つはどちらも同じ意味
type ReadOnlyClassNames = Readonly<classNames>
type ReadOnlyClassNames2 = {
  readonly myClassName1: string;
  readonly myClassName2: string;
  // ...else
}
// constで複合オブジェクト型（配列、関数、オブジェクト）の再代入をロックしつつ、
// Readonlyを与えればよりタイプセーフな開発ができそう
// これは使える

// readonlyはクラス内でも使う
// その場合はコンストラクタでの初期化かフィールド初期化での代入しかできないそう
class Icecream {
  readonly name = "バニラ"; // OK
  readonly price: number; // OK
  constructor () {
    this.price = 150; // OK
    // this.name = 'チョコ' // NG
  }
}
