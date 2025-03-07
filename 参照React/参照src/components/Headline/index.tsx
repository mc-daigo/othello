"use client";
import Image from "next/image";
import styles from "./Headline.module.css"
import { ReactNode, useCallback, useContext } from "react";

import { GlobalValueContext } from "@/components/providers/GlobalValueProvider"

type Props = {
  page: string;
  // number: number;
  // // array: Array<number>; // 配列その1 どっちでもいい
  // array: number[]; // 配列その2 どっちでもいい
  // // array2:  Array<Array<number>>; // 多次元配列その1 どっちでもいい
  // array2: number[][]; // 多次配列その2 どっちでもいい
  // array2: Array<number[]>; // 多次配列その3 どっちでもいい
  // obj: {foo:string, bar:string};
  // boolean: boolean;
  // code: ReactNode; // jsxを使うときの型。reactからimportする
  // onClick: () => void; // 親が普通には関数を渡せないのでここでは使わないが関数の場合はこのように宣言
  // tuple: [string, number]; // タプル型で違う型の配列も使える。この場合はtuple[0]が文字列でtuple[1]が数字
  children: ReactNode // childrenはコンポーネントとして渡すならReactNodeだが文字列だけならstringでもいい。
                      //ReactNode[]とすると<p>などの要素が複数あるとchildren[0]は最初の<p>だけになる。
};
//
export const Headline = ({ page, children }: Props) => {
// export function Headline({ page, number,array, obj, boolean, code, children }: Props) { // もしも引数を使う場合（使わない引数はコメントアウトした）
// export function Headline(props: Props) { // こうやって分割代入させずに props.page のような使い方もよい
// 分割代入をする場合childrenもこちらに引数を書く必要がある

// returnの外でpageなどの値を読むには{page}ではなくpageと直接書く
  // console.log("boolean:" + boolean)
  // console.log("obj:" + obj)
  // console.log("array:" + array)
  // console.log("page:" + page)
  console.log("children:" + children)


// 例1 pageを直接使う場合。({page})ではない
// const handleClick = () => {
//   alert(page);
// };

  // 例2  pageの値を受け取ってalertを表示する関数
  const handleClick = (str: string) => {
    alert(str);
  };



  const context = useContext(GlobalValueContext);
  if (!context) {
    throw new Error("GlobalValueContext must be used within GlobalValueProvider");
  }
  const { globalString, setGlobalString, globalBoolean, globalNumber,  incrementGlobalNumber, decrementGlobalNumber } = context;

  const changeGlobalString = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalString(e.target.value)
  },[])

  return (
    <>
    {/* <p>{number}, {array[1]}, {obj.bar}</p> */}
      <h1 className={styles.title}>{page} page</h1>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p>Headline globalString：<input type="text" value={globalString} onChange={changeGlobalString} /></p>      
      <p>Headline globalBoolean：{globalBoolean ? "ON" : "OFF"}</p>
      <p>{`Headline globalString：${globalString}`}</p>
      <p>{`Headline globalNumber：${globalNumber}`}</p>
      <button onClick={incrementGlobalNumber}>Links incrementGlobalNumber</button>
      <button onClick={decrementGlobalNumber}>Links decrementGlobalNumber</button>
      <ol>
        <li>
          Get started by editing {children}.
          {/* Get started by editing {code}. */}
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
{/* 
      例1の場合
      <button onClick={handleClick}>ボタン</button>
       */}

      {/* 例2の場合 */}
      <button onClick={() => handleClick(page)}>ボタン</button> {/* 無名関数でhandleClickを呼び出す。この方法だと引数が使えるが({page})ではなく(page)*/}
    </>
  );
}
