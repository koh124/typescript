// typeof演算子
// typeofは変数や値から型を抽出できる
// 型を再利用したい場合に使える
// javascriptのtypeofと全く同じ記述だが別物

// すでに宣言してある変数から型を使いまわしたい場合に使えそう？
const axis = {
  x: 2,
  y: -2
};
// 以下は同じ型
type Axis = typeof axis;
type Axis2 = {
  x: number;
  y: number;
}
