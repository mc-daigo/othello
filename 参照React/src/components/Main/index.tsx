"use client";
import styles from "./Main.module.css"
import { Links } from "@/components/Links";
import { Headline } from "@/components/Headline";
import { useBgColor } from "@/hooks/useBgColor";
import { useCallback, useState } from "react";
// import { GlobalValueProvider } from "@/components/providers/GlobalValueProvider"

type Props = {
  page: string;
}

type itemType = {
  href: string,
  title: string,
  description: string
}

const ITEMS:itemType[] = [
  {
    href: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "①疾風ザブングル →",
    description: "ここは地の果て流されて俺 今日もさすらい涙も枯れる"
   },
  {
    href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "②黄金戦士ゴールドライタン \u2192",
    description: "明日にかけて行くおれたちの願いが 届いているか聞こえるか遥かメカ次元"
   },
  {
    href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "③ババーンと推参！バーンブレイバーン",
    description: "この地球の嘆く声を聴け 安らぎを護る盾となれ"
   },
  {
    href: "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "④闘士ゴーディアン",
    description: "赤い血潮はその色の 真っ赤な夕日背に受けて"
   }
]

export const Main = ({page}:Props) => {
  const [items, setItems] = useState<itemType[]>(ITEMS)
  const handleReduce = useCallback(() => {
    setItems(prevItems => prevItems.slice(0, prevItems.length - 1))
  },[])
  // useBgLightBlue(page)
  useBgColor()
  return (
    <main className={styles.main}>
      {/* <GlobalValueProvider> */}
        <Headline page={page}>
          <code>src/app/{page}.tsx</code>
        </Headline>
        <Links items={items} handleReduce={handleReduce} />
      {/* </GlobalValueProvider> */}
    </main>
  );
}
