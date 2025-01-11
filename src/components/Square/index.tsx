"use client";
import { useContext } from "react";
import styles from "./Square.module.css"
import { GlobalValueContext } from "@/components/providers/GlobalValueProvider"

type SquareProps = {
  row: number,
  column: number,
  stone: string,
  // onClick: (row: number, column: number, stone: string) => void,
};

export const Square = ({ row, column, stone }: SquareProps) => {
  // contextのテンプレート
  const context = useContext(GlobalValueContext)
  if (!context) {
    throw new Error("GlobalValueContext must be used within GlobalValueProvider");
  }
  const {clickSquare, handleAnimationEnd} = context
  const handleClick = () => {
    // onClick(row, column, stone);
    clickSquare(row, column, stone);
  };
  return (
    <li
      className={styles.square}
      role="button"
      data-row={row}
      data-column={column}
      // key={String(row) + String(column)}
      onClick={handleClick}
    >
      <p
        className={stone
          .split(" ") // スペースで分割して配列に
          .map((cls) => styles[cls]) // 各クラス名をstylesオブジェクトから取得
          .join(" ")} // 配列をスペースで結合してクラス名文字列を生成}
        data-stone={stone}
        onAnimationEnd={() => handleAnimationEnd(row, column)}>
      </p>
    </li>
  );
}
