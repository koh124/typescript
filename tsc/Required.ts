// Required型
// Required<T>
// すべてのプロパティをrequiredにするユーティリティ型
// Tのすべてのプロパティから?を取り除く
type Food = {
  name: string,
  price?: number
}

// readonlyのようにrequiredキーワードというものは存在しない
// そもそも型のプロパティ名を宣言した時点でプロパティ名が必須になるから
const carrot: Required<Food> = {
  name: 'にんじん',
  price: 98 // プロパティを外すとエラー
};
