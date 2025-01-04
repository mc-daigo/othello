"use client";
import { useContext } from "react";
import styles from "./Window.module.css"
import { GlobalValueContext } from "@/components/providers/GlobalValueProvider"

export const Window = () => {
  // contextのテンプレート
  const context = useContext(GlobalValueContext)
  if (!context) {
    throw new Error("GlobalValueContext must be used within GlobalValueProvider");
  }
  const {isBlack, turn} = context

  return (
    <div className={styles.window}>
      <div className={styles.turnBox}>
        <p className={styles.turnPlayer}><span>{isBlack ? "黒" : "白"}</span>のターン</p>
        <p className={styles.turnCount}>{`${turn}`}</p>
      </div>
      <div className={styles.messageBox}>
        <p className={styles.message}>一人で黒と白を順番に虚しく配置してください。<br />先手は黒からです。<br />石の置ける場所をクリックすれば進められます。</p>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.button}>パス</button>
      </div>
    </div>
  );
}
