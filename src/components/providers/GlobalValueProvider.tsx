"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

// import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

type GlobalValueContextType = {
  isBlack: boolean,
  changePlayer: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  turn: number,
  countUp: () => void,
  squares: string[][],
  clickSquare: (e: React.MouseEvent<HTMLLIElement>) => void,
  isAnimating :boolean,
  handleAnimationEnd: (row: number, column: number) => void,
} | null;
// type GlobalValueContextType = {
//   globalString: string,
//   setGlobalString: Dispatch<SetStateAction<string>>,
//   globalBoolean: boolean,
//   // setGlobalBoolean: Dispatch<SetStateAction<boolean>>,
//   globalNumber: number,
//   // setGlobalNumber: Dispatch<SetStateAction<number>>,
//   incrementGlobalNumber: () => void,
//   decrementGlobalNumber: () => void,
//   toggleglobalBoolean: () => void,
// } | null;

export const GlobalValueContext = createContext<GlobalValueContextType>(null);

export const  GlobalValueProvider = ({ children }: { children: ReactNode }) => {
  // 現在のプレイヤーが黒か否か
  const [isBlack, setIsBlack] = useState(true)
  // 現在のターン数
  const [turn, setTurn] = useState(1)
  // 現在アニメーション中か否か
  const[isAnimating, setIsAnimating] = useState(false)
  // マスの状態の配列（初期状態用）
  const SQUARES: string[][] = [
    ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["none", "none", "none", "white", "black", "none", "none", "none",],
    ["none", "none", "none", "black", "white", "none", "none", "none",],
    ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["none", "none", "none", "none", "none", "none", "none", "none",],
  ]
  // 上記配列を初期値としたマスの状態
  const [squares, setSquares] = useState<string[][]>(SQUARES)

  // プレイヤー変更の関数（セレクターによるテスト用）
  const changePlayer = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    // if(isBlack){
    //   console.log('changePlayer前:black')
    // }
    // else{
    //   console.log('changePlayer前:white')
    // }
    // console.log("e.target.valuer前：" + e.target.value)

    // セレクターの値で現在のプレイヤーを設定
    setIsBlack(e.target.value === 'black'); // 選択された値に応じて状態を更新
    // if(isBlack){
    //   console.log('changePlayer後:black')
    // }
    // else{
    //   console.log('changePlayer後:white')
    // }
    // console.log("e.target.valuer後：" + e.target.value)
  }, [isBlack])
  
  // ターン数カウントアップ
  const countUp = useCallback(() => {
    setTurn((prevCount) => prevCount + 1)
  }, [turn])


  // アニメーション終了後に次の石を切り替える（CSSアニメーション終了後に自動で呼ばれる）
  const handleAnimationEnd = useCallback((row: number, column: number) => {
    // アニメーション中のフラグを戻す
    setIsAnimating(false)
    // stateのマス目の石情報の配列を更新する
    setSquares((prevSquares) => {
      // 上書き用の配列をstate変更前の配列から複製
      const newSquares = [...prevSquares]
      // 新しい配列の変更のあったマス目の黒か白かを変更する（クラスplacingが消える）
      newSquares[row][column] = isBlack ? 'black' : 'white'
      // 現在のプレイヤーを入れ替える
      // setIsBlack((prevIsBlack) => !prevIsBlack)
      // 新しい配列をstateに返す
      return newSquares
    })
      // 現在のプレイヤーを入れ替え、セレクターの値を連動して更新
    setIsBlack((prevIsBlack) => !prevIsBlack);
    // カウントアップする
    countUp()
  },[isBlack, squares])
  
  // マス目の状態を変更する関数 クリックされたときに呼び出す（isBlackをここで直接取得すると同期されていない可能性があるので引数で取得する）
  const changeSquares = useCallback((row: number, column: number, innerIsBlack: boolean) => {
    // stateのマス目の石情報の配列を更新する
    setSquares((prevSquares) => {
      // 上書き用の配列をstate変更前の配列から複製
      const newSquares = [...prevSquares]
      // if(innerIsBlack){
      //   console.log('changeSquares：black')
      // }
      // else{
      //   console.log('changeSquares：white')
      // }
      // 新しい配列の変更のあったマス目をアニメーションをさせるためにクラスが "black placing" のようになるように2つの文字列を配列に書き換える
      newSquares[row][column] = `${innerIsBlack ? 'black' : 'white'} placing`
      // さらなる処理を追加予定

      // 新しい配列をstateに返す
      return newSquares
    })
  }, [squares])



  // useCallbackを使うと再レンダリングされたときに再生成されない
  // マスをクリックしたときに呼び出される関数
  const clickSquare = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    // if(isBlack){
    //   console.log('clickSquare前:black')
    // }
    // else{
    //   console.log('clickSquare前:white')
    // }
    // <li> 要素を取得
    const liElement = e.currentTarget
    // <li> の data-row と data-column を取得
    const row = Number(liElement.dataset.row)
    const column = Number(liElement.dataset.column)
    // <p> 要素を取得
    const pElement = liElement.querySelector('p');
    // <p> の className と data-stone を取得
    // <p> 要素が見つからない場合に備え、?.（オプショナルチェーン）で安全にアクセスしています。
    const className = pElement?.className || 'unknown';
    const stone = pElement?.dataset.stone || 'unknown';
    // アニメーション中か、すでに石が置かれているマスをクリックしていたら終了
    if((isAnimating) || (stone !== 'none')){
      return
    }
    // 隣の石がひっくり返すことができそこに石を置くことができるか確認

    // アニメーション中でなければアニメーション中のフラグを立てる
    setIsAnimating(true)

    // setState のコールバック関数を使用して、最新の状態を安全に参照する方法
    setIsBlack((prevIsBlack) => {
      // 最新の isBlack を使用して状態を更新
      changeSquares(row, column, prevIsBlack)
      return prevIsBlack; // 状態の変更が必要ならここで更新
    });


    console.log('Row:', row);
    console.log('Column:', column);
    console.log('ClassName:', className);
    console.log('Data-stone:', stone);
  }, [squares]);



  let message = "一人で黒と白を順番に虚しく配置してください。<br />先手は黒からです。<br />石の置ける場所をクリックすれば進められます。"
  // const [globalString, setGlobalString] = useState("初期値")
  // const [globalBoolean, setGlobalBoolean] = useState(false)
  // const [globalNumber, setGlobalNumber] = useState(0)
  // const incrementGlobalNumber = useCallback(() => {
  //   setGlobalNumber((prev) => prev + 1)
  // },[globalNumber])
  // const decrementGlobalNumber = useCallback(() => {
  //   setGlobalNumber((prev) => prev - 1)
  // },[globalNumber])
  // const toggleglobalBoolean = useCallback(() => {
  //   setGlobalBoolean((prev) => !prev )
  // },[globalBoolean])


  return (
    <GlobalValueContext.Provider value={{ isBlack, changePlayer, turn, countUp, squares, clickSquare, isAnimating, handleAnimationEnd}}>
      {children}
    </GlobalValueContext.Provider>
  );
};
