import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

// export const useBgLightBlue = (page: string) => {
//   // マウント時に青くしたいがアンマウント時に元に戻したい場合
//   // useEffectの最後で関数をreturnするとアンマウント時の処理を書ける
//   // retrunまでがマウント時の処理でreturnからがアンマウント時の処理
//   // 空文字にすると指定した色が解除される
//   // "use client"; がないとエラーが起きる
//   useEffect(() => {
//     if(page === "index"){
//      document.body.style.backgroundColor = "lightblue"
//     }
//     return () => {
//       document.body.style.backgroundColor = ""
//     }
//   }, [])
// }


export const useBgColor = () => {

  // useRouter は pages ディレクトリでの使用を前提としており、app ディレクトリでは未対応です。
  // usePathname は app ディレクトリのアプローチに適応した新しいフックです。
  const pathname = usePathname()
  const bgColor = useMemo(() => {
    switch (pathname){
      case "/":{
        return "lightblue"
      }
      case "/about":{
        return "beige"
      }
      default:{
        return ""
      }
    }
    // return pathname === "/" ? "lightblue" : "beige";
  },[pathname])
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [bgColor])
}
