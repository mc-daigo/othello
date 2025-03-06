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
  clickButton: () => void,
  isAnimating: boolean,
  isPlaying: boolean,
  blackCount: number,
  whiteCount: number,
  handleAnimationEnd: (row: number, column: number) => void,
  changeStones: () => void,
  buttonLabel: string,
  message: React.ReactNode,
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
  // 列の座標アルファベット
  const columnCoordinate = ['a', 'b','c','d','e','f','g','h']

  // 白から黒へひっくり返るアニメーションパターンのクラス名の配列
  const blackSteps = ['white', 'change_w', 'change_n', 'change_b', 'black'];
  // 黒から白は上記配列をひっくり返す
  const whiteSteps = [...blackSteps].reverse();


  // ウィンドウのボタンの文字
  const [buttonLabel, setButtonLabel] = useState("パス")

  // 現在のプレイヤーが黒か否か
  const [isBlack, setIsBlack] = useState(true)
  // 現在のターン数
  const [turn, setTurn] = useState(1)
  // 現在アニメーション中か否か
  const[isAnimating, setIsAnimating] = useState(false)
  // 現在プレイ中か否か（起動時からプレイ中とし、結果発表のときのみfalseになる）
  const[isPlaying, setIsPlaying] = useState(true)
  // 現在の黒の石数
  const [blackCount, setBlackCount] = useState(2)
  // 現在の白の石数
  const [whiteCount, setWhiteCount] = useState(2)
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




  // メッセージ（文字列に<br />を含めたい場合、React.ReactNode型の状態であればJSX形式で設定）
  const [message, setMessage] = useState<React.ReactNode>(
    <>
      現在コンピュータとの対戦機能は実装されていませんので、一人で黒と白を順番に虚しく配置してください。<br />先手は黒からです。<br />石の置ける場所をクリックすれば進められます。
    </>
  );




  // プレイヤー変更の関数（セレクターによるテスト用）
  const changePlayer = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {

    // セレクターの値で現在のプレイヤーを設定
    setIsBlack(e.target.value === 'black'); // 選択された値に応じて状態を更新

  }, [isBlack])
  
  // ターン数カウントアップ
  const countUp = useCallback(() => {
    setTurn((prevCount) => prevCount + 1)
  }, [turn])


  // アニメーション終了後に次の石を切り替える（CSSアニメーション終了後に自動で呼ばれる）
  const handleAnimationEnd = useCallback((row: number, column: number) => {
    // アニメーション中のフラグを戻す
    setIsAnimating(false)
    setMessage(
      <>
        {isAnimating ? 'アニメ中handleAnimationEnd' : 'アニメじゃないhandleAnimationEnd'}
      </>
    )
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
      // 新しい配列の変更のあったマス目をアニメーションをさせるためにクラスが "black placing" のようになるように2つの文字列を配列に書き換える
      newSquares[row][column] = `${innerIsBlack ? 'black' : 'white'} placing`
      // さらなる処理を追加予定

      // 新しい配列をstateに返す
      return newSquares
    })
  }, [squares])



  // useCallbackを使うと再レンダリングされたときに再生成されない（多分このcontextでは使っても無意味だが一応やっておく）
  // マスをクリックしたときに呼び出される関数
  const clickSquare = useCallback((row: number, column: number, stone: string) => {

    setMessage(
      <>
        現在{isBlack ? '黒' : '白'}石は {columnCoordinate[column]}{row + 1} には置けません。
        <br />
        別のマスを選んでください。
      </>
    )
    // アニメーション中か、すでに石が置かれているマスをクリックしていたら終了
    if((isAnimating) || (stone !== 'none')){
      setMessage(
        <>
          アニメ中か石がすでにあるからクリックは無効
        </>
      )
      return
    }
    // 隣の石がひっくり返すことができそこに石を置くことができるか確認

    // アニメーション中でなければアニメーション中のフラグを立てる
    setIsAnimating(true)
    console.log("clickSquare: " + isAnimating);
    setMessage(
      <>
        {isAnimating ? 'アニメ中：clickSquare' : 'アニメじゃない：clickSquare'}
      </>
    )
    // setState のコールバック関数を使用して、最新の状態を安全に参照する方法
    setIsBlack((prevIsBlack) => {
      // 最新の isBlack を使用して状態を更新
      placingStone(row, column, prevIsBlack)
      return prevIsBlack; // 状態の変更が必要ならここで更新
    });
  }, [isAnimating, placingStone]);

  // ボタンをクリックしたときに呼び出される関数
  const clickButton = useCallback(() => {

    // setIsAnimating((prevIsAnimating) => {
    //   return prevIsAnimating; // 状態の変更が必要ならここで更新
    // });
    // アニメーション中なら終了
    if(isAnimating){
      setMessage(
        <>
          アニメ中だからボタンは無効<br />現在{isBlack ? '黒' : '白'}
        </>
      )
      return
    }
    else{
      setMessage(
        <>
          アニメじゃない？？？<br />現在{isBlack ? '黒' : '白'}
        </>
      )
    }
  }, [isAnimating]);




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
        // 複製された配列の指定された座標のクラス名を現在のアニメーションパターンのステップに差し替える
        newSquares[row][column] = stepSequence[currentStep]
        // 複製された配列をstateに返して更新する
        return newSquares;
      });

      console.log(`Step ${currentStep + 1}/${stepSequence.length} complete for [${row}, ${column}]`);

      // 次のステップに移る前に一定時間待つ（resolveだけが引数だと何もしないで時間経過）
      await new Promise((resolve) => setTimeout(resolve, 75));
    }

    console.log(`Animation complete for [${row}, ${column}]`);
  };

  // すでに置かれた石を変更する関数
  const changeStones = async () => {

    console.log("Starting animations for stones: ", changingStones);
    // アニメーション中はフラグを立てて他の操作ができないようにする（すでにこの関数を呼び出す前に立っている可能性大）
    setIsAnimating(true);
    setMessage(
      <>
        {isAnimating ? 'アニメ中：changeStones' : 'アニメじゃない：changeStones'}
      </>
    )
    // 変更予定の全ての石に対して非同期でアニメーションを適用（mapは非同期処理では不安定なので使わない）
    for (const changingStone of changingStones) {
      // 取得した配列がなかったり中身がnumber型でない場合はエラー
      if (!changingStone || typeof changingStone.row !== "number" || typeof changingStone.column !== "number") {
        console.error("Invalid changingStone: ", changingStone);
        continue;
      }

      // 各石のアニメーションを完了させるまで待つ（これで各石ごとに順番にひっくり返るようになる）
      await flipStone(changingStone.row, changingStone.column);
    }
    // アニメーションフラグを戻す
    setIsAnimating(false);
    setMessage(
      <>
        {isAnimating ? 'アニメ中：changeStones2' : 'アニメじゃない：changeStones2'}
      </>
    )
    console.log("All animations complete.");
  };





  return (
    <GlobalValueContext.Provider value={{ isBlack, changePlayer, turn, countUp, squares, clickSquare, isAnimating, isPlaying, blackCount, whiteCount, handleAnimationEnd, changeStones, buttonLabel, clickButton, message}}>
      {children}
    </GlobalValueContext.Provider>
  );
};
