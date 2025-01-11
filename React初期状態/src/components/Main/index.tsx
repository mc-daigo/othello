"use client";
import { Window } from "@/components/Window";
import { Board } from "@/components/Board";
import styles from "./Main.module.css"

export const Main = () => {
  return (
    <main className={styles.main}>
      <Window />
      <Board />
    </main>
  );
}
