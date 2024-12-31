"use client";
import styles from "./Window.module.css"

export const Window = () => {
  return (
    <div className={styles.window}>
      <div className={styles.turnBox}>
        <p className={styles.turnPlayer}><span>黒</span>のターン</p>
        <p className={styles.turnCount}>1</p>
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
