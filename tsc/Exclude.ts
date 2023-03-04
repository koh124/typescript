// Exclude型
// Exclude<T, U>
// ユニオン型Tから型Uで指定した型を取り除いたユニオン型を返すユーティリティ型
// T: ユニオン型
// U: Tから取り除きたい型
type Rank = "S" | "A" | "B" | "C" | "D";

// 以下は同じ意味
type PassRank = Exclude<Rank, "C" | "D">;
type PassRank2 = "S" | "A" | "B"
