"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

// import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

type GlobalValueContextType = {
  isBlack: boolean,
  changePlayer: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  turn: number,
  countUp: () => void,
  squares: string[][],
  // clickSquare: (e: React.MouseEvent<HTMLLIElement>) => void,
  clickSquare: (row: number, column: number, stone: string) => void,
  isAnimating :boolean,
  handleAnimationEnd: (row: number, column: number) => void,
  changeStones: () => void,
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

  // 座標の型
  type Coordinate = {row: number, column: number}
  // テスト用：変更されるマス座標
  const changingStones: Coordinate[] = [
    {row:0, column:0},
    {row:0, column:1},
    {row:0, column:2},
    {row:0, column:3},
    {row:0, column:4},
    // {row:1, column:0},
    // {row:1, column:1},
    // {row:1, column:2},
    // {row:1, column:3},
    // {row:1, column:4},
  ]

  // 白から黒へひっくり返るアニメーションパターンのクラス名の配列
  const blackSteps = ['white', 'change_w', 'change_n', 'change_b', 'black'];
  // 黒から白は上記配列をひっくり返す
  const whiteSteps = [...blackSteps].reverse();


  // 現在のプレイヤーが黒か否か
  const [isBlack, setIsBlack] = useState(true)
  // 現在のターン数
  const [turn, setTurn] = useState(1)
  // 現在アニメーション中か否か
  const[isAnimating, setIsAnimating] = useState(false)
  // マスの状態の配列（初期状態用）
  const SQUARES: string[][] = [
    // ["none", "none", "none", "none", "none", "none", "none", "none",],
    // ["none", "none", "none", "none", "none", "none", "none", "none",],
    ["white", "white", "white", "white", "white", "white", "white", "white",],
    ["black", "black", "black", "black", "black", "black", "black", "black",],
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
      // 新しい配列をstateに返す
      return newSquares
    })
      // 現在のプレイヤーを入れ替え、セレクターの値を連動して更新
    setIsBlack((prevIsBlack) => !prevIsBlack);
    // カウントアップする
    countUp()
  },[isBlack, squares])
  
  // 新しく石を配置する関数 クリックされたときに呼び出す（isBlackをここで直接取得すると同期されていない可能性があるので引数で取得する）
  const placingStone = useCallback((row: number, column: number, innerIsBlack: boolean) => {
    // stateのマス目の石情報の配列を更新する
    setSquares((prevSquares) => {
      // 上書き用の配列をstate変更前の配列から複製
      const newSquares = [...prevSquares]
      // if(innerIsBlack){
      //   console.log('placingStone：black')
      // }
      // else{
      //   console.log('placingStone：white')
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
  const clickSquare = useCallback((row: number, column: number, stone: string) => {
    // if(isBlack){
    //   console.log('clickSquare前:black')
    // }
    // else{
    //   console.log('clickSquare前:white')
    // }

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
      placingStone(row, column, prevIsBlack)
      return prevIsBlack; // 状態の変更が必要ならここで更新
    });


    // console.log('Row:', row);
    // console.log('Column:', column);
    // console.log('ClassName:', className);
    // console.log('Data-stone:', stone);
  }, [isAnimating, placingStone]);


  // // マスをクリックしたときに呼び出される関数
  // const clickSquare = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
  //   const liElement = e.currentTarget
  //   // <li> の data-row と data-column を取得
  //   const row = Number(liElement.dataset.row)
  //   const column = Number(liElement.dataset.column)
  //   // <p> 要素を取得
  //   const pElement = liElement.querySelector('p');
  //   // <p> の className と data-stone を取得
  //   // <p> 要素が見つからない場合に備え、?.（オプショナルチェーン）で安全にアクセスしています。
  //   const className = pElement?.className || 'unknown';
  //   const stone = pElement?.dataset.stone || 'unknown';
  //   // アニメーション中か、すでに石が置かれているマスをクリックしていたら終了
  //   if((isAnimating) || (stone !== 'none')){
  //     return
  //   }
  //   // 隣の石がひっくり返すことができそこに石を置くことができるか確認

  //   // アニメーション中でなければアニメーション中のフラグを立てる
  //   setIsAnimating(true)

  //   // setState のコールバック関数を使用して、最新の状態を安全に参照する方法
  //   setIsBlack((prevIsBlack) => {
  //     // 最新の isBlack を使用して状態を更新
  //     placingStone(row, column, prevIsBlack)
  //     return prevIsBlack; // 状態の変更が必要ならここで更新
  //   });


  //   console.log('Row:', row);
  //   console.log('Column:', column);
  //   console.log('ClassName:', className);
  //   console.log('Data-stone:', stone);
  // }, [squares]);



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


  // // 指定された座標の石をひっくり返す関数
  // const flipStone = useCallback((row: number, column: number, stepSequence: string[]) => {

  //   // 現在のステップ数を宣言
  //   let currentStep = 0;
  //   // 時間ごとに自動で繰り返し
  //   const interval = setInterval(() => {
  //     // 
  //     if (currentStep >= stepSequence.length) {
  //       clearInterval(interval); // タイマー停止
  //       // isAnimating = false; // アニメーション終了
  //       return; // 安全に処理を終了
  //     }
  //     // クラスをステップの配列から次に切り替えるためstateのマス目の石情報の配列を更新する
  //     setSquares((prevSquares) => {
        
  //       // 上書き用の配列をstate変更前の配列から複製
  //       const newSquares = [...prevSquares]
  //       // 指定されたマス目の状態をアニメーションパターンクラス名に変更
  //       newSquares[row][column] = stepSequence[currentStep]
  //       // 新しい配列をstateに返す
  //       console.log("1：" + currentStep)
  //       return newSquares
  //     })

  //     // ステップ数を追加
  //     currentStep++;
  //     console.log("2：" + currentStep)

  //   }, 500); // 50ms間隔でクラスを変更



  // },[squares])

  // // すでに置かれた石が変更される関数
  // const changeStones = useCallback(() => {
  //   // 白から黒へのアニメーションパターンクラス名の順番
  //   const blackSteps = ['white', 'change_w', 'change_n', 'change_b', 'black'];
  //   // 黒から白へは上記がひっくり返る
  //   const whiteSteps = [...blackSteps].reverse();
  //   // data-stoneを確認して黒か白かのどちらかステップ配列を決定
  //   const stepSequence = isBlack ? blackSteps : whiteSteps;
  //   // アニメーション中はフラグを立てて他の操作ができないようにする（すでにこの関数を呼び出す前に立っている可能性大）
  //   setIsAnimating(true)
  //   changingStones.map((changingStone) => {
  //     flipStone(changingStone.row, changingStone.column, stepSequence)
      
  //   })
  //   // アニメーションフラグを戻す
  //   setIsAnimating(false)
  // },[changingStones])





// 指定された座標の石をひっくり返す関数（非同期版）
const flipStone = async (row: number, column: number) => {
  // 現在のプレイヤーの石の色によってアニメーションパターンのクラス名配列を取得
  const stepSequence = isBlack ? blackSteps : whiteSteps;
  // 取得した配列がおかしかったらエラー
  if (!stepSequence || stepSequence.length === 0) {
    console.error("Invalid stepSequence: ", stepSequence);
    return;
  }
  // mapを非同期処理で使うと挙動がおかしくなる可能性があるのでforを使って繰り返し処理
  for (let currentStep = 0; currentStep < stepSequence.length; currentStep++) {
    // 石の状態を更新
    setSquares((prevSquares) => {
      // 現在のマスの状態（クラス名）の配列を複製する
      const newSquares = [...prevSquares]
      // 指定された座標のクラス名を現在のアニメーションパターンのステップに差し替える
      newSquares[row][column] = stepSequence[currentStep]
      return newSquares;
    });

    console.log(`Step ${currentStep + 1}/${stepSequence.length} complete for [${row}, ${column}]`);

    // 次のステップに移る前に一定時間待つ
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  console.log(`Animation complete for [${row}, ${column}]`);
};

// すでに置かれた石を変更する関数
const changeStones = async () => {



  console.log("Starting animations for stones: ", changingStones);

  setIsAnimating(true);

  // 全ての石に対して非同期でアニメーションを適用
  for (const changingStone of changingStones) {
    if (!changingStone || typeof changingStone.row !== "number" || typeof changingStone.column !== "number") {
      console.error("Invalid changingStone: ", changingStone);
      continue;
    }

    // 各石のアニメーションを完了させるまで待つ
    await flipStone(changingStone.row, changingStone.column);
  }

  setIsAnimating(false);

  console.log("All animations complete.");
};





  return (
    <GlobalValueContext.Provider value={{ isBlack, changePlayer, turn, countUp, squares, clickSquare, isAnimating, handleAnimationEnd, changeStones}}>
      {children}
    </GlobalValueContext.Provider>
  );
};
