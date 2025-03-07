import { useCallback, useMemo, useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(1)
  const [isShow, setIsShow] = useState(true)
  const doubleCount = useMemo(() => {
    return count *2
  }, [count])

  // 外部だと引数の渡しがめんどくさいがコンポーネントが再レンダリングされてもメソッドは再生成されない
  // <a>に使う場合はイベントの型はReact.MouseEvent<HTMLAnchorElement>で、React.MouseEventだけでも一応大丈夫
  const handleClick1 = (e: React.MouseEvent<HTMLAnchorElement>, foo: number) =>{
    console.log(e.target)
    e.preventDefault()
    alert(foo);
  }

  // 内部だとコンポーネントが再レンダリングされるとメソッドは再生成される
  // <button>の場合はReact.MouseEvent<HTMLButtonElement>でReact.MouseEventだけでも一応大丈夫
  const handleClick2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target); // HTMLButtonElement として扱われます
    setCount(count => count + 1)
    setCount(count => count + 1)
  };

  // useCallbackを使うと再レンダリングされたときに再生成されない
  const handleClick3 = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
    // alert(count);
    console.log(count);
    if(count < 10){
      setCount(prevCount => prevCount + 1)
    }
  }, [count]);

  const handleDisplay = useCallback(() => {
    setIsShow((prevIsShow) =>  !prevIsShow)
  },[])

  return {count, isShow, doubleCount, handleClick1, handleClick2, handleClick3, handleDisplay}
}