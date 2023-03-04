// 型定義ファイル（.d.ts）の出力
// 自分で宣言した型は、コマンドラインから出力して型定義ファイルを作成することができる
// $ tsc -d {*.ts}
interface Person {
  firstName: string;
  lastName: string;
}
