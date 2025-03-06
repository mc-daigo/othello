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
  const {isBlack, turn, buttonLabel, isPlaying, blackCount, whiteCount, clickButton, message} = context

  return (
    <div className={styles.window}>
      <div className={styles.turnBox}>
      {/* プレイ中と結果発表で表示が変わる */}
      {isPlaying ?
        <>
          <p className={styles.turnPlayer}><span>{isBlack ? '黒' : '白'}</span>のターン</p>
          <p className={styles.turnCount}>{turn}</p>
        </>
        :
        <>
          <div className={styles.playersPC}>
            <p>黒</p>
            <p>白</p>
          </div>
          <div className={styles.scorePC}>
            <p>{blackCount}</p>
            <p>-</p>
            <p>{whiteCount}</p>
          </div>
          <p className={styles.playersSP}>黒</p>
          <div className={styles.scoreSP}>
            <p>{blackCount}</p>
            <p>-</p>
            <p>{whiteCount}</p>
          </div>
          <p className={styles.playersSP}>白</p>
        </>
      }
      </div>
      <div className={styles.messageBox}>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.button} onClick={clickButton}>{buttonLabel}</button>
      </div>
    </div>
  );
}
