"use client";
// import Image from "next/image";

import styles from "./Links.module.css"
import { GlobalValueContext } from "@/components/providers/GlobalValueProvider"
import { useContext } from "react";

type itemType = {
  href: string,
  title: string,
  description: string
}
type Props = {
  items: itemType[];
  handleReduce: () => void;
}

export const Links = ({items, handleReduce}:Props) => {

  const context = useContext(GlobalValueContext);
  if (!context) {
    throw new Error("GlobalValueContext must be used within GlobalValueProvider");
  }
  const { globalString, globalBoolean, toggleglobalBoolean, globalNumber,  incrementGlobalNumber, decrementGlobalNumber } = context;


  return (
    <div className={styles.ctas}>
      <div className={styles.grid}>
        <div>
          <button onClick={toggleglobalBoolean}>Links globalBoolean：{globalBoolean ? "ON" : "OFF"}</button>
          <p>{`Links globalString：${globalString}`}</p>
          <p>{`Links globalNumber：${globalNumber}`}</p>
          <button onClick={incrementGlobalNumber}>Links incrementGlobalNumber</button>
          <button onClick={decrementGlobalNumber}>Links decrementGlobalNumber</button>
        </div>
        <button onClick={handleReduce}>減らす</button>
        {/* map関数でコンポーネントを配列として返している */}
        {items.map(item => {
          return(
            <a key={item.href} href={item.href} className={styles.card}>
              <h2>{item.title} &rarr;</h2>
              <p>{item.description}</p>
            </a>
          )
        })}
      </div>
      {/* {}の中に配列でコンポーネントを配置すると直接表示できる。 */}
{/* 
      {[<p>1111</p>, <p>2222</p>, <p>3333</p>, <p>4444</p>]}
*/}

{/*       
      <a
        className={styles.primary}
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className={styles.logo}
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Deploy now
      </a>
      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.secondary}
      >
        Read our docs
      </a> */}

    </div>
  );
}
