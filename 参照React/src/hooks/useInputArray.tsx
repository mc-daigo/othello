import { useCallback, useState } from "react";

export const useInputArray = () => {
  const [text, setText] = useState("")  //
  const [array, setArray] = useState<string[]>([])

  const handelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > 5){
      alert("5文字以内にしてください")
      return
    }
    setText(e.target.value.trim())
  },[])

  const handleAdd = useCallback(() =>{
    setArray((prevArray) => {
      if (prevArray.includes(text)){
      // if (prevArray.some(item => item === text)){
        alert("同じ要素がすでに存在します。")
        return prevArray
      }
      return [...prevArray, text]
    })
  },[text])

  return {text, array, handelChange, handleAdd}
}