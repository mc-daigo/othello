# 【Next jsで学ぶReact講座 #1】Reactを学ぶにはNext.jsから入ると効率が良い理由。Next.jsのセットアップからVercelへのデプロイまで！
https://www.youtube.com/watch?v=15WLMqnkPsE&t=453s

 セットアップ
yarn create next-app
か
npx create-next-app

yarn ならその後プロジェクト名をつける
https://zenn.dev/ikkik/articles/51d97ff70bd0da

https://qiita.com/kaba_san/items/302b8b731e7fbfa56367

https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/src-directory

https://qiita.com/masakinihirota/items/77b52f51a3069c72005f

https://ja.next-community-docs.dev/docs/app/building-your-application/configuring/src-directory

https://qiita.com/mu_tomoya/items/7545bea039e82e483f9e

とりあえずTypeScript、ESLint、Tailwind CSS、'src'ディレクトリ、App Router、import aliasすべてnoで実行

cd study-react で移動したあと
yarn dev で実行（npm startはできない）
http://localhost:3000
とターミナルで出るのでそれでブラウザーで確認

ctrl+cで終了

yarn build
で.nextフォルダにビルドされ
yarn start
が使えるようになる。

基本的にはdevで開発を行う。

pagesフォルダが根幹

pages/index.jsで
http://localhost:3000
にアクセスしてる

pages/about.jsは
http://localhost:3000/about
になる。

publicは静的なファイル

stylesはあまり関係ない

-------------------
npxの場合は
npx create-next-app プロジェクト名 --ts --use-npm

ローカルサーバー立ち上げは
npm run dev


====================================
https://www.youtube.com/watch?v=lO-Ulx1rclk
デフォルトで作ると
app/page.tsxの内容を表示する。

export default function Page() {
}
のようにする。

app/global.css
が効いている

appの中にファイルを作るとそこがアドレスになる
http://localhost:3000/about
は
app/about/page.tsxを読んでいるので
export default function Page() {
}
にする




----------------------------------------------------------------------
# 【Next jsで学ぶReact講座 #2】コンポーネントの作り方と、Next.jsでの静的ページの作り方を学ぼう
https://www.youtube.com/watch?v=l9BY-uyZpGM

pages/index.jsを編集
index.jsをabout.jsに名前をかえると
http://localhost:3000/about
で表示される

複製してindex.jsにして二枚にする


Next.jsだけだが
import Head from "next/head";
としたあとに
<Head>の中身を編集すると
htmlの<head>と同じ編集ができる。

pagesフォルダを使わずsrc/appフォルダを使う場合は
export default function Home() {
の外で
export const metadata = {
  title: "Index",
};
のようにしてやる

<main className={`${styles.main} ${inter.className}`}>
の中の同じ部分をコンポーネント化する
<hooter>も


pagesの中ではなく同じ階層にcomponentsというフォルダを作成する

中にFooter.jsを作成してindex.jsをコピーしてreturnの中を<footer>だけ残す。
（ただ、元にしたindex.jsには<footer>がないので適当に作る<Footer>ではない）
使ってないimportを削除して、function Home()をfunction Footerに変える

export defaultもあまりよくないので消す
export function Footer() {
にする

index.jsで
import { Footer } from "@/components/Footer";
として（動画では../components/Footerになってるが@は自動で生成されるのでこれでいい）

about.jsも同様にする。

似たような方法でリンク集の部分をLinks.jsに独立させる



----------------------------------------------------------------------
# 【Next jsで学ぶReact講座 #3】Propsを使ってコンポーネントの表示を出し分け！Fragmentは使うべき？
https://www.youtube.com/watch?v=Ai9rMk5QbOo&t=2s


components/Headline.jsを作成
index.jsの<main>内の<Links>と<Footer>以外をコンポーネントにする。

export default function Headline(props) {
と引数にpropsを入れる

index.jsでは
<Headline title="Index Page" />
のように書く
about.jsは
<Headline title="About Page" />

Headline.jsでこう書くと引数が表示される
<h2>{props.title}</h2>

<h2 className={styles.title}>{props.page} Page</h2>
として
styles/Home.modules.css
に.titleをなければ作成
.title{
  text-transform: capitalize;
}
とすると最初の文字が大文字になる




----------------------------------------------------------------------
# 【Next jsで学ぶReact講座 #4】Propsに色んなデータを渡したり、Childrenを使ってみよう！
https://www.youtube.com/watch?v=XScsi491Yuc

export default function Headline(props) {
のdefaultはない方がいい。
消した場合、import側は{}で囲む

defaultがあるときに{}で囲むとエラー

index.htmlなどの
export default function Home() {
  defaultは消せない
pages配下でurlで読めるようにするにはexport defaultにする必要がある

propsで数値を渡す時は
<Headline page="about" number={1} />
カッコで囲む
文字列は""で囲む。 {}がなくてもいいし{"文字列"}でもいい

<Headline page="about" number={1} array={[1,2,3]} obj={{ foo: "foo", bar: "bar" }} />
配列も渡せる、オブジェクトも渡せる。オブジェクトは{{}}と二重になる

<Headline  boolean={true} />
<Headline  boolean />
booleanは値だけだとtrueを渡せる

<Headline comp= {<div>foo</div>}/>
コンポーネント(jsx)も渡せる

呼び出し元のabout.jsで
<Headline page="about" number={1} array={[1,2,3]} obj={{ foo: "foo", bar: "bar" }} boolean={true} code= {<code className={styles.code}>pages/about.js</code>}/>
とし、Headline.jsで
<p>{props.code}</p>で表示できる

関数も呼び出せる。呼び出し元で
<Headline onClick={() => alert("クリック！")} />
とし、Headline.jsで
<button onClick={props.onClick}>ボタン</button>で呼び出せる

<Headline page="index" code= {<code className={styles.code}>pages/index.js</code>} onClick={() => alert("クリック！")} >foo</Headline>
と綴じタグで囲むと中のfooはprops.childrenとして渡される
コンポーネントはchildrenで渡すことが多い

<Headline page="index" code= {<code className={styles.code}>pages/index.js</code>} onClick={() => alert("クリック！")} ><code className={styles.code}>pages/index.js</code></Headline>



components/Main.jsを作成

export function Main(props) {
  return (
      <main className={`${styles.main} ${inter.className}`}>
        <Headline page={props.page}><code className={styles.code}>pages/{props.page}.js</code></Headline>
        <Links />
      </main>
  );
}


----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #5】CSS Modulesを使うとCSSの管理が楽になる
https://www.youtube.com/watch?v=5bI7nnrK8Q4&t=1s

import styles from "@/styles/Home.module.css";
は
<code className={styles.code}>
などで使う

名前が被らない


https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/built-in-css-support
に色々書いてある。

公式のコンポーネントレベル CSS の追加
https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/built-in-css-support#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%83%AC%E3%83%99%E3%83%AB-css-%E3%81%AE%E8%BF%BD%E5%8A%A0


sassの使い方もある。
https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/built-in-css-support#sass%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88


<main className={`${styles.main} ${inter.className}`}>
が
http://localhost:3000/
には
Home_main__VkIEL __className_aaf875
のようなクラス名になっている
被らないように勝手につけられる


styles/Home.module.css
の.module.cssという名前が大事

公式に
Next.js では、[name].module.css という命名規則に則ることで、 CSS Modules がサポートされます。
と書いてある。

注意点は、クラスセレクタ以外は使えないところ



import styles from "@/styles/Home.module.css";
の styles の名前は何でもいい。

import classes from "@/styles/Home.module.css";
なら
<code className={classes.code}>
となる



styles/Home.module.css
をcomponentsにコピー
components/Footer.module.css
のようにする

中はfooter関連だけ書いておく
他のページも同様

components/Footer.js
なら
import classes from "./Footer.module.css";
または
import classes from "@/components/Footer.module.css";
で呼び出せる。

<footer className={classes.footer}>
のように。
クラス名は必要なので要素名だけではできない。

別にFooterとファイル名をつける必要もない


グローバルに定義した場合
\pages\_app.js
を見ると
import "@/styles/globals.css";
がimportされている

styles\globals.css
だが名前は変えてもいい。
しかし_app.jsで呼ぶ必要がある




----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #6】Linkコンポーネントを使って高速なページ遷移を実現しよう！
https://www.youtube.com/watch?v=qrF3AbAx_9c&t=6s

Header.jsを作ってヘッダーに遷移ボタンを配置する
Footer.jsを元に作成

export function Header() {
  return (
    <header>
      <a href="/">Index</a>
      <a href="/about">About</a>
    </header>
  );
}

index.jsの<Head>と<Main>の間に<Header />をいれる
about.jsも同じ

<a>でも上記の通りにすれば一応リンクはできるが新しくページが読み込まれて無駄なリクエストが発生してしまう
Next.jsのLinkコンポーネントで解決できる。

Header.jsで
import Link from "next/link";
でlinkコンポーネントをインポートする

export function Header() {
  return (
    <header>
      <Link href="/">
        Index
      </Link>
      <Link href="/about">
        About
      </Link>
    </header>
  );
}
と書き換える
hrefは<Link>にいれる
前は
<header>
  <Link href="/">
    <a>Index</a>
  </Link>
  <Link href="/about">
    <a>About</a>
  </Link>
</header>
と<Link>の中に<a>を入れたのだがv13でできなくなった

<Link>での遷移は読み込みがかなり早くなる

本番環境だとprefetchという機能が有効になり、画面内に映ったリンクの先のデータを予めバックグラウンドで取得する

Reactの機能ではなくNext.jsの機能である


https://nextjs.org/docs/app/api-reference/components/link






----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #7】コンポーネントを繰り返すときはmapをよく使います！
https://www.youtube.com/watch?v=h4981N9af18

Links.jsに
const ITEMS = [
  {
    href: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "疾風ザブングル",
    description: "ここは地の果て流されて俺 今日もさすらい涙も枯れる"
   },
  {
    href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "黄金戦士ゴールドライタン",
    description: "明日にかけて行くおれたちの願いを 届いているか聞こえるか遥かメカ次元"
   },
  {
    href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "ババーンと推参！バーンブレイバーン",
    description: "この地球の嘆く声を聴け 安らぎを護る盾となれ"
   },
  {
    href: "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "闘士ゴーディアン",
    description: "赤い血潮はその色の 真っ赤な夕日背に受けて"
   }
]
と宣言。
大文字なのは不変ということ。

これを繰り返して同じ処理を避ける

<div className={classes.grid}>
  {ITEMS.map(item => {
    return(
      <a
        href={item.href}
        className={classes.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </a>
    )
  })}
</div>

return内で配列があっても
{[<div>aaa</div>,<div>bb</div>,<div>cc</div>]}
このようにカンマで区切っても表示される。

つまりmap関数で配列を作って表示させている。

keyがないと警告が出るので
return(
  <a
    key={item.href}
    href={item.href}
    className={classes.card}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2>{item.title}</h2>
    <p>{item.description}</p>
  </a>
)
のようにする。
keyは一意でないとイケナイがurlなら多分被らない



yarn add next react react-dom
でバージョンアップできる


&rarr;
のような&で始まって;で終わる記述はHTML Entitiesという
JSXの中で使うとReactがエスケープしてこの場合「→」に変換する
が、文字列として渡しているのとそのままになってしまう。

UTF8ならそのまま使ってしまっていい

直接文字列に"→"とやってしまっていい

ユニコードでもいい
文字列の中で "\u2192"とやると→に変換できる。



----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #8】jsとjsxどっち？ディレクトリ構成は何がいい？絶対パスインポートはどうやるの？_appってどう使うの？
https://www.youtube.com/watch?v=-W62SGQaOSI

## リファクタリング

拡張子.jsを.jsxに変える。

.jsxだとdivと打ってエンターを押すと補完してくれる


### srcフォルダを作成し、components、pages、stylesフォルダを移動させる
VSCodeにパスの変換を自動でさせる

src/pagesがあるのにpagesをルートディレクトリに置いていると動かない


yarn dev中だとうまくできないかも

止めてもうまくできなかったら各.jsxのパスを自力で
import classes from "@/src/components/Links.module.css";
のように書き換える。

同じディレクトリなら
import { Links } from "@/src/components/Links";
でも
import { Links } from "./Links";
でもよい


next.config.jsやtsconfig.jsonはそのままルートディレクトリに置く

publicディレクトリもsrcに入れられない


### componentsフォルダのjsxとcssをディレクトリを作成させて移動させる

FooterならFooterディレクトリを作成させ移動させる
それだとindex.jsxなどでリンクがちゃんとならず
import { Footer } from "@/src/components/Footer";
を
import { Footer } from "@/src/components/Footer/Footer";
にしなければならない。
これでも大丈夫なのだが

@/src/components/Footer/Footer.jsx
を
@/src/components/Footer/index.jsx
に名前を変えると
import { Footer } from "@/src/components/Footer"
のままで大丈夫になる。

@/src/components/Footer/Footer.jsx
のcssへのリンクも直らないみたいなので
import classes from "./Footer.module.css";
にしたほうがいいかも

pages/index.jsxでは
import { Main } from "@/src/components/Main/Main";
と勝手に書き換えてる場合もある

src/components/Main/index.jsx
で
import { Links } from "@/src/components/Links";
は大丈夫だが
import { Links } from "./Links";
だとダメだった
import { Links } from "../Links";
だと大丈夫だった。


### 絶対パス

import { Links } from "./Links";
import { Links } from "../Links";
など

https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases
に書いてある。

TypeScriptだとtsconfig.jsonを定義
JavaScriptだとjsconfig.json を定義

{
  "compilerOptions": {
    "baseUrl": "."
  }
}

jsconfig.jsonなどがあるディレクトリをbaseにするという意味
動画でもあるとおりだと
src/components/Main/index.jsx
で
import { Headline } from "src/components/Headline";
と書けるが、今は

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

なので
import { Headline } from "@/src/components/Headline";
と書けば絶対になる。


### 自動でimportするとデフォルトでは相対になるところを絶対にする。

VSCodeでCtrl + 「,」で設定を開く

上のタブのユーザーだと全てに適応され、ワークスペースだとそのプロジェクトだけに適応される。

ワークスペースを選択して右上のJSONファイルを表示するアイコンをクリックすると.vscode/setting.jsonが作成される。
が、普通に設定でimportで検索し
JavaScirpt > Preferences:Import Modules Specifier
をshortestからnon-relativeを選択する。
これで絶対パスになる。

これでもJSONファイルは作成される。

チームでやる場合は.vscode/setting.jsonもgitのリポジトリにあげる


### src/pages/_app.jsx

https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/custom-app

レイアウトを維持したり、ナビゲーションの状態を維持したり、エラーのハンドリングを行ったり、
追加データをページに入れたいとき、グローバルCSSを読み込みたいとき
/pages/_app.jsxを使う。

グローバルCSSは
import "@/src/styles/globals.css";
と読み込んでいる

/pages/_app.jsx
で何かしらの処理を書いたら各ページでも呼ばれる


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

を
export default function App({ Component, pageProps }) {
  return (
    <div>
      aaaaa
      <Component {...pageProps} />
    </div>
  )
}

と書き換えるとindex.jsもabout.jsも各ページの上の方にaaaaaと表示されてしまう。

ファビコンとかはまとめてもいい

/pages/index.jsxの
<Head>
  <title>Index Page</title>
  <meta name="description" content="Generated by create next app" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</Head>

の<title>Index Page</title>以外は消す

/pages/_app.jsxなどで
に
import Head from "next/head";
として
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}とtitle以外を貼る

これでindex.jsxとabout.jsxで共有できる




----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #9】クリックイベント（onClick）はどう扱う？メソッド（関数）の書く位置はどこがオススメ？
https://www.youtube.com/watch?v=-0OkztyAgaU

## ボタン
index.jsxなどで
<button
  onClick={function (){
    alert(123)
  }}>ボタン
</button>
onClickに関数を書けばボタンを押されたときに呼び出せる

## イベント

<a
  href="/about"
  >
  ボタン
</a>
でリンクはするが普通はLinkを使う

### ボタンを押しても何も起きない処理

<a
href="/about"
onClick={function (e){
  e.preventDefault()
  alert(123)
}}
>ボタン</a>

だとaboutに遷移されずにアラートが表示される。

引数はeでなくてもなんでもいい
eは<a>をクリックしたときのイベントの属性が入っている

e.preventDefault()
がないとアラートが表示されたあとにaboutに遷移する

<a
href="/about"
onClick={function (e){
  console.log(e.target)
  e.preventDefault()
}}
>ボタン</a>
とやると
<a href="/about">ボタン</a>
と表示される

jsxで書いたものはブラウザに表示されるときはDOMになる。
DOMの上記で書いた要素をe.targetで取得している

console.log(e.target.href)
とするとhref属性を取得して
http://localhost:3000/about
と表示される

e.target.〇〇とすることでクリックした要素の属性にアクセスすることができる

input要素でよくe.target.valutとして今打ってる文字を取得するときに使う

https://ja.legacy.reactjs.org/docs/events.html
にイベント説明

今回はマウスイベント
ソースの e でマウスオーバーするとe:MouseEventと表示される

ブラウザでイベントを扱うためのメソッドは用意されているがクロスブラウザということで
一つのブラウザだけでなく色んなブラウザでも同様の操作が起きるように
wrapperという形でReact側で使いやすいようにしてくれている
基本的にはブラウザのネイティブイベントと同じでJavaScriptの知識と思っていいい


function()
を使ってメソッドを定義することは関数宣言という

function (e) {}
は
(e) => {}
とアロー関数に置き換えられる

returnの前にもfunctionは置けるが名前が必要


function handleClick (e){
  console.log(e.target.href)
  e.preventDefault()
  alert(123)
}
などとreturnの外で宣言しておけば
<a
  href="/about"
  onClick={handleClick}
  >ボタン</a>

で呼び出せる

アロー関数なら
const handleClick = (e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(123)
}

handleClickは
コンポーネント
export default function Home() {}
の中に入れてもいいが、外に置いてもいい

onClick={}
の中に直接書く方法はオススメしない。
長くなるので

煩雑にならないなら外部に書いたほうがいい

煩雑の例は内部で宣言した変数を外部の関数で読もうとすること
エラーになる

コンポーネント外に
const handleClick = (e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
}

コンポーネント内で
const foo = 1
とやっても読めない

しかしコンポーネント外に
const handleClick = (e, foo) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
}
コンポーネント内で
const foo = 1
で

<a
  href="/about"
  onClick={(e) =>{
    handleClick(e, foo)
  }}
  >ボタン</a>
とやれば読める

なので内部に書いたほうがよさそうだが、
コンポーネントが再レンダリングされる際メソッドも再生成されてしまう。
コンポーネントの外だと再生成されないのでその場合はパフォーマンスがよくなる

### 回避策はuseCallback

内部の
const handleClick = (e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
}
を以下のようにする

const handleClick = useCallback((e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
})

import { useCallback } from "react";
も自動でついてくる

useCallbackは第二引数が必要
なので
const handleClick = useCallback((e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
}, [])
と空の配列をいれてやる

useCallbackを使うと処理自体は変わらないが、再レンダリングされたときに再生成されなくなる。



----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #10】useEffectとライフサイクルを理解して、ページが読み込まれたときにイベントを設定してみよう
https://www.youtube.com/watch?v=QWDTz8nhK28

## コンポーネントのライフサイクル

JSXがブラウザ側で動くときはDOMになっている。DOMになるときのことをreactではマウントという
一番最初にコンポーネントが表示されるとき

このコンポーネントが何かしらの処理で消えてしまう時をアンマウントという

コンポーネントのライフサイクルはマウントやアンマウントだけでなく
親から受け取るpropsが変わったときやstateが変わったときとか
その状態変化に応じてコンポーネントの出力は変わっていく。


### 背景色をブラウザが読み込まれたときに変える

前回のhandleClickは不要なので一度コメントアウト
<a>も同様にコメントアウト

useEffectをreactからインポートする

return の外（handleClickと同じ場所）に

useEffect(() => {
  document.body.style.backgroundColor = "lightblue"
}, [])

背景色が青くなる

Home()コンポーネントがDOMになる瞬間（マウントされるとき）（JSXがレンダリングされる瞬間）
useEffectの処理が走る。

マウント時に処理をさせたときはこの中に書く


現在の状態だとindexだけでなくaboutに移動したときも青のままになってしまう。
aboutに青くする処理がないのに。

マウント時に青くしたいがアンマウント時に元に戻したい場合
useEffectの最後で関数をreturnするとアンマウント時の処理を書ける
retrunまでがマウント時の処理でreturnからがアンマウント時の処理

useEffect(() => {
  document.body.style.backgroundColor = "lightblue"
  return () => {
    document.body.style.backgroundColor = ""
  }
}, [])
空文字にすると指定した色が解除される

第二引数の空配列[]に何らかの変数を入れることによってuseCallbackやuseEffectの処理を
もう一度実行させることができる。


### pagesのjsxだけでなくcomponents内でも実行可能

src\components\Main\index.jsx
にuseEffectを移動させる。
import { useEffect } from "react";
も書く

pages/index.jsxのは消す。

aboutに行くときにアンマウントされてからマウントされる。
つまり青いまま

この状態でpages/index.jsxの
<Main page="index" />
をコメントアウトすると
背景色がリセットされる。
ただしaboutに行くと青くなる。


## 注意点

DOM要素に直接アクセスするようなことはなるべく控える
今回のようにbodyの背景色を変えるのは本来はNG

bodyならまだいいが、next.jsは
<div id="__next">にいろいろ処理を行う
<div id="__next">管轄内の要素にアクセスするときquerySelectorなどを使ってアクセスするのはNG
bodyは管轄外なのでまあいい

DOMに直接触るのはReactでは絶対NG

document.querySelector("main").appendChild
などはNG

どうしてもやりたい場合はRefを使う
useRefを使って行うことができる。


src\components\Main\index.jsx
のuseEffectは消してpages/index.jsxのを戻す。

handleClickも戻しておく



----------------------------------------------------------------------
# 【【Next.jsで学ぶReact講座 #11】useStateの状態管理について解説！君はsetStateに関数を使っているか？
https://www.youtube.com/watch?v=aJTyIP4GVC4


## ボタンを押したらカウントアップするようにする

<a href="/about" onClick={(e) =>{
    handleClick(e, foo)
  }}
  >ボタン</a>

は以前に

<a href="/about" onClick={handleClick}>
  ボタン
</a>

になる戻す必要があったらしいので戻す。
さらに<a>である必要はないので(カウントなのでhrefがいらない)

<button onClick={handleClick}>
  ボタン
</button>
に書き換える


const handleClick = useCallback((e) => {
  console.log(e.target.href)
  e.preventDefault()
  alert(foo)
}, [])

はHomeの中、returnの外のままでhandleClickを書き換える。
アラート表示の中身を消して、useCallbackも今回は使わない。
とりあえず空っぽにする。
const handleClick = (e) => {

}

<button>の上にカウンターを表示
<h1>{foo}</h1>
foo は前に作った変数でHomeの中、returnの外

ボタンを押したらfooが増えるようにする

### fooを普通にカウントしたらどうなるか？

一度foo のconstをletにする。
constだと再代入できないから。

let foo = 1;

そして
const handleClick = (e) => {
  foo = foo + 1
}
とする。

が、これだとボタンを押してもカウントの表示が更新されない。
しかし

const handleClick = (e) => {
  foo = foo + 1
  console.log(foo);
}

と書いておくと内部ではコンソール上で数字がカウントアップされている。
しかし表示が更新されない。

Reactのコンポーネントは状態が変化しないとコンポーネントが再レンダリングされないから。

コンポーネントを再レンダリングさせるには状態（state）が変化させる
ReactではuseStateを使ってstateの管理を行う

親がレンダリングされたタイミングで子コンポーネントが受け取っているpropsの値が変わると再レンダリングされる。

pagesのindex.htmlは親がいないのでpropsを受け取って状態が変化することはない。

console.log(foo);
をhandleClickの外、でreturnの一個前に置くと
fooの値は変わっているがhandleClickが使われてもconsole.log(foo);が呼ばれない。
そのためfooの値が変わってもコンソールでは表示されない。

コンポーネントが呼び出されないのでfooの値が表示されない


### fooをstateで書き換える

const [foo, setFoo] = useState(1)
と書き
let foo = 1
foo = foo + 1
はコメントアウト

const [foo, setFoo] = useState(1)
は配列の分割代入
useState(1)が配列を介している

わかりやすく書くと
const array = useState(1)
array[0]にfoo、array[1]にsetFooが入っている

const foo = arrya[0]
const setFoo = array[1]
と書くのは面倒
分割代入をすることで上記の記述をなくせる

const handleClick = (e) => {
  setFoo(2)
}
とやるとボタンを押すと2になる。

コンポーネントが再レンダリングされる。
console.logも更新される

setFoo(foo + 1)
なら押すたびに増える

挙動は問題ないが書き方が正しくない

setFoo(foo => foo + 1)
が正しい
または
setFoo((foo) => foo + 1)

別な書き方だと
setFoo(function (foo){
  return foo + 1
})
と同じ



#### setFoo(foo + 1)とsetFoo(foo => foo + 1)の違い

setFoo(foo + 1)は直接数値を代入するのと同じ挙動になる

これはfooが1ならsetFoo(2)と同じ
もしも
setFoo(foo + 1)
setFoo(foo + 1)
と二回続けてやっても1ずつしか増えない

setFoo(2)
setFoo(2)
とやってるのと同じだから

一回押しただけだと1ずつしか上がらない


setFoo(foo => foo + 1)
setFoo(foo => foo + 1)

だと2ずつあがる

関数の引数fooは前回の状態を反映さえることができる。

今回のカウントアップはいい例で
前の状態を用いてそれに対して何か処理をしたい場合は
setFooの中に関数を書く

必ず関数を書く必要があるわけでない。
前の状態を用いた処理をしたい場合だけ。

配列はオブジェクトと違って分割代入のときに好きな値をつけられる



----------------------------------------------------------------------
# 【【Next.jsで学ぶReact講座 #12】useEffectやuseCallbackの第2引数の配列について理解を深めよう
https://www.youtube.com/watch?v=yNIVF0Uw5aY

## useEffect/useCallbackの第2引数の空配列[]について

### useEffect

useEffectの先頭に
console.log("foo")
と書いた場合

useEffect(() => {
  console.log("foo")
  document.body.style.backgroundColor = "lightblue"
  return () => {
    document.body.style.backgroundColor = ""
  }
}, [])

第二引数が空ならボタンを押してカウントアップされた場合でもfooは最初しか表示されない。

第二引数にcountと入れると
useEffect(() => {
  console.log("foo")
  document.body.style.backgroundColor = "lightblue"
  return () => {
    document.body.style.backgroundColor = ""
  }
}, [count])

fooがカウントアップごとに表示される

useEffectの第二引数の[]に変数を入れると変数が変更されたタイミングで
改めてuseEffectの部分の処理が走る。

returnのアンマウント時の処理（Cleanup Function）も再度呼ばれる
上記の場合、countが変化したタイミングでもreturnも呼ばれる

useEffect(() => {
  console.log("foo")
  document.body.style.backgroundColor = "lightblue"
  return () => {
    console.log("bar")
    document.body.style.backgroundColor = ""
  }
}, [count])
とすると

ボタンを押すたびにbarも表示される。
アンマウント時でないのに。

タイミングはアンマウントの方が先に呼ばれる。
bar、fooの順番

useEffect(() => {
  console.log(`マウント時：${count}`)
  document.body.style.backgroundColor = "lightblue"
  return () => {
    console.log(`アンマウント時：${count}`)
    document.body.style.backgroundColor = ""
  }
}, [count])
とすると一回ボタンを押すと
アンマウント時：1
マウント時：3
と表示される。
アンマウント時は前回のカウントのまま表示される。

前回の状態を一旦、解除・破棄して新しく何かしらの処理をさせたいときに
Cleanup Functionと第二引数の変数を用いて処理を行うことがある。

第二引数は配列なのでいくつでも変数をいれることができる。
複数の場合はどれか一つでも変更があれば実行される。

一旦useEffectはもとに戻す


### useCallback

const handleClick = (e) => {
  setCount(count => count + 1)
  setCount(count => count + 1)
}
を
const handleClick = useCallback((e) => {
  setCount(count => count + 1)
  setCount(count => count + 1)
},[])
と書き換える
上記の場合は従来の動きのまま


もしも
const handleClick = useCallback((e) => {
  if(count < 10){
    setCount(count => count + 1)
  }
},[])
とした場合、10以上でもカウントアップされてしまう。

const handleClick = useCallback((e) => {
  console.log(count)
  if(count < 10){
    setCount(count => count + 1)
  }
},[])
とした場合、カウントアップは表示されるが
コンソールは1のままになる。

useCallbackで第二引数に何も入れなかったらcountの中身がずっと同じ状態になる。
useCallbackは再生成がされないから。

第二引数に何も指定してなかったらuseCallbackが再度生成されないので
countは1のまま更新されることがない。

そのためcountはずっと1なので if(count < 10) がずっと成り立つのでカウントアップされてしまう。
別の場所にあるconsole.log(count)だとカウントアップされている。

setCountに関しては値はcountでなくてもなんでもよい。

前回のcountを見て、それに対して処理をするので今回のケースはcountがどんどん増える


const handleClick = useCallback((e) => {
  console.log(count)
    setCount(count + 1)
},[])

とすると数値を直接指定しているが、一回2が表示されるがその後はそのままになる。

(e) => {
  console.log(count)
    setCount(count + 1)
}

の関数が更新されないからcountが1のまま

const handleClick = useCallback((e) => {
  console.log(1)
    setCount(1 + 1)
},[])
でcountが更新されないのでずっと2が入り続ける。

const handleClick = useCallback((e) => {
  console.log(count)
    setCount((count) => count + 1)
},[])
だったら前回のcountを持ってきてそれに対して処理を与えて返すので
useCallbackの中で第二引数が空配列だとしてもちゃんとカウントアップされる。


#### useCallbackの第二引数にcountを入れるとどういう挙動になるのか

const handleClick = useCallback((e) => {
  console.log(count)
  if(count < 10){
    setCount((count) => count + 1)
  }
},[])
だとボタンを押し続けると10以上になってもそのまま更新される。
countが1のまま更新されていないからsetCount((count) => count + 1)が走る


const handleClick = useCallback((e) => {
  console.log(count)
  if(count < 10){
    setCount((count) => count + 1)
  }
},[count])

だとcountが変更されるたびに関数が再生成されるので10以上になったら実行されない
コンソールは10まではカウントされている。

useCallbackの第二引数もuseEffectと同じように値を指定してやればその値が変化するたびに
関数のメソッド部分
(e) => {
  console.log(count)
  if(count < 10){
    setCount((count) => count + 1)
  }
が再生成される。


## なぜ[]の中に変数を指定して更新・再生成させたりという処理が必要なのか？

パフォーマンスのために用いられる

ユーザーからの何かしらの更新ですべて再レンダリングしていたらパフォーマンスがどんどん落ちてしまう。

更新させる必要があるものと必要がないものが出てくる

必要な分だけ指定することによって処理を何度もさせることなくパフォーマンスの良いアプリケーションができる。

const handleClick = useCallback((e) => {
  console.log(count)
  if(count < 10){
    setCount((count) => count + 1)
  }
},[count])
のeは使ってないので消していい





----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #13】useStateで文字列（string）や真偽値（boolean）を扱ってみよう
https://www.youtube.com/watch?v=8u75d-qSzPY

## いろんな値の扱い方について

### 文字列

const [text, setText] = useState("")
<botton>の下に
<input type="text" value={text} />
を置く
onChangeがないとエラーが出る。
onChangeはinputに何かしらのテキストを打ってテキストが変更されたらその時のイベントを取得することができる。

(e) => {e.target.value}
とうつとinputで打ったテキストを取得できる。

それをsetTextでテキストにセットする

<input 
  type="text" 
  value={text} 
  onChange={(e) => {
    setText(e.target.value)
  }}
/>
とするとinputに文字を入れると表示される。

onChangeがコメントアウトされたり、setTextがないと文字を入れても表示されない。
setTextでtextが更新されないのでvalue={text}が空文字のままだから

もしも
const [text, setText] = useState("aaa")
だとaaaが表示続ける

console.log(text);
でコンソールに表示される。

setTextでstateが更新されているのでこのコンポーネントの更新が走っている。

onChange={(e) => {
  if(text.length >= 5){
    return
  }
  setText(e.target.value)
}}
とすると5文字までしか更新されない。

export default function Home()のreturnの外に
const handleChange = (e) => {
  setText(e.target.value)
}
と書いて
<input type="text" value={text} onChange={handleChange} />
とすると同じ動作になる。

const handleChange = useCallback((e) => {
  setText(e.target.value)
}, [])
とすると再レンダリングされない。

const handleChange = useCallback((e) => {
  if(e.target.value.length > 5){
    alert("5文字以内にしてください")
    return
  }
  setText(e.target.value)
}, [])
とすると5文字を超えるとアラートが出てリターンされるのでsetTextされない


#### triming処理

空白を取り除きたいときにtrimを使うことによって文字列の前後の空白を取り除くことができる。

const handleChange = useCallback((e) => {
  if(e.target.value.length > 5){
    alert("5文字以内にしてください")
    return
  }
  setText(e.target.value.trim())
}, [])

とするとスペースを押しても空白が表示されない
文字列の前後の空白を取り除くことができる。



### 真偽値（Boolean）

const [isShow, setIsShow] = useState(true)
としてisShowの値によりカウントの表示非表示が切り替わる。

#### 三項演算子を使う。

{true ? <h1>{count}</h1> : null}
だとするとtrueが条件で、条件のところがtrueだと<h1>{count}</h1>になり、falseだとnullになる。
この場合は必ずtrueなので<h1>{count}</h1>が必ず実行される。

reactにおいて、nullを返すことによって何も表示させないということが可能になる

react(jsx)はreturn文の中でif文を扱うことができない。
{if () {}}はできないので三項演算子を使う。

{isShow ? <h1>{count}</h1> : null}
としてボタンをクリックすることでisShowを出し分けてみる

<button onClick={() =>{
  setIsShow(false)
}}>
  非表示
</button>
とするとボタンを押すとisShowがfalseになるのでカウントが消える

##### ボタンを押すことで表示非表示を切り替える

前回のisShowの値を見てtrueだったらfalse、falseだったらtrueにする

setIsShowに直接値を書くのではなく関数を書く必要がある。

<button onClick={() =>{
  setIsShow((isShow) => {
    if(isShow === true){
      return false
    }
    else{
      return true
    }
  })
}}>
  非表示
</button>
とすると押すたびに表示が切り替わる

{isShow ? "非表示" : "表示"}
とするとボタンの表示も変わる

このように文言を変えるときにも三項演算子は使う

<button onClick={() =>{
  setIsShow((isShow) => {
    return isShow ? false : true
  })
}}>
  {isShow ? "非表示" : "表示"}
</button>

でもいいし

<button onClick={() =>{
  setIsShow((isShow) => {
    return !isShow
  })
}}>
  {isShow ? "非表示" : "表示"}
</button>

でもいい

null、undefined、0はFalsyな値で
return !false
return !0
return !null
return !undefined
はどれもtrueが帰る

最終的にはアロー関数なので
setIsShow((isShow) => !isShow)
でよい

const handleDisplay = () =>{
  setIsShow(isShow => !isShow)
}

<button onClick={handleDisplay}>
  {isShow ? "非表示" : "表示"}
</button>
と分けられる

useCallbackで何度も生成されるのを防ぐ
const handleDisplay = useCallback(() =>{
  setIsShow(isShow => !isShow)
},[])



----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #14】イミュータブルや破壊的メソッドを理解しよう！スプレッド構文を使う理由とは！？
https://www.youtube.com/watch?v=STUaBcp5ft4


## useStateで配列を扱う

以下のように準備
const [array, setArray] = useState([])

<ul>
  {array.map(item => {
    return(
      <li key={item}>{item}</li>
    )
  })}
</ul>

コンポーネントを回しながら出すときにはkeyが必要

配列が空なので中身はでない。<ul>だけ
const [array, setArray] = useState([1,2,3])
とすれば最初から1,2,3と表示される

<button onClick={handleAdd}>追加</button>
でボタンを押したときに
setArrayで要素を増し、リストを増やすようにする


const [array, setArray] = useState([])
const handleAdd = useCallback(() => {
  setArray([1,2,3])
},[])
だと最初は何もないがボタンを押したときに配列が追加されて1,2,3と表示される

これを追加で一つずつ増やせるようにする。



==========
arrayやこれまでのcount、isShowなどとわかりにくいので
handle～関数の引数を書き換える

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    return prevArray
  })
},[])

const handleClick = useCallback(() => {
  console.log(count)
  if(count < 10){
    setCount((prevCount) => prevCount + 1)
  }
},[count])

const handleDisplay = useCallback(() =>{
  setIsShow(prevIsShow => !prevIsShow)
},[])

**set～で中に関数を使う場合、引数は自動的にarray、count、isShowの直前の値になる。**
==========

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    return prevArray
  })
},[])

だとprevArrayをそのまま返しているだけなので更新がないのでレンダリングされない


const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, 1]
    return newArray
  })
},[])

とするとarrayの直前の配列にさらに1を追加する。
押し続ける限り続くがkeyが同じ値なのでエラーになる。
本来keyは被らない

...prevArrayはスプレッド構文

スプレッド構文をなぜ使うのか理解するためにはまず破壊的メソッドと非破壊的メソッドを知る必要がある。

## 破壊的メソッド

配列の破壊的メソッド一覧
https://jsprimer.net/basic/array/#mutable-immutable

メソッド名	返り値
Array.prototype.pop	配列の末尾の値
Array.prototype.push	変更後の配列のlength
Array.prototype.splice	取り除かれた要素を含む配列
Array.prototype.reverse	反転した配列
Array.prototype.shift	配列の先頭の値
Array.prototype.sort	ソートした配列
Array.prototype.unshift	変更後の配列のlength
Array.prototype.copyWithin[ES2015]	変更後の配列
Array.prototype.fill[ES2015]	変更後の配列

最近のJavaScriptにおいてはこういう破壊的メソッドを使うのはNG
基本的に破壊的メソッド使ってはいけなく、それを避けるためによく使われるのがスプレッド構文

オブジェクトも普通に書こうとしたらオブジェクトを宣言してそのオブジェクトに対して何か値を入れたら
それだけで破壊的メソッドになってしまうのでオブジェクトもスプレッド構文を用いる。


例えばコンソールで
const foo = {};
と宣言すると
undefinedと表示されるが
foo.aaa = 1;
とすると
foo
は{aaa:1}
と表示される

元の宣言から変わっているのでこれも破壊的
元のオブジェクトを変えてしまったから。

こういうのを避けるためにもスプレッド構文は使われる。


### なぜ破壊的メソッドはだめなのか？

ミュータブル / イミュータブルという概念について理解する

ミュータブル / イミュータブルとは、一度、値を作成したあとにその値を変更できるかどうか

ミュータブルは一度値を作成したあとに変更できること。
イミュータブルは一度値を作成したあとに変更できないこと。

JavaScriptにおいては文字列や数値はデフォルトでイミュータブルになっている。
配列とオブジェクトはデフォルトでミュータブルになっている
値を作成したあとも変更できてしまう

このミュータブルが最近のJavaScriptの世界では悪とされているので
ミュータブルを避けてイミュータブルにしていこうという動きがある

配列とオブジェクトはミュータブルになので適切に扱う必要があるが
破壊的メソッドを使ったらミュータブルなものとして扱うことになるので
破壊的メソッドを避けてスプレッド構文を用いて配列やオブジェクトもイミュータブルに扱いたい

JavaScriptの値はミュータブル / イミュータブルなものがあってイミュータブルの方がよいとされている
ただ、配列とオブジェクトはもともとイミュータブルではないので開発者が頑張ってイミュータブルに扱う必要がある

pop / pushなどの破壊的メソッドを用いてしまうと配列やオブジェクトの値が変わってしまう
つまりミュータブルなものとして扱ってしまうことになるので破壊的メソッドはなるべく避けて別の書き方をする必要がある。
そのためによく用いらているのがスプレッド構文



==========
const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, 1]
    return newArray
  })
},[])

の [...prevArray, 1]がスプレッド構文だがこうすることによって
prevArrayがミュータブルなものとして扱われず、イミュータブルなものとして扱われる


## Reactのstateの扱い方

### スプレッド構文で扱っていたものを破壊的メソッドを用いて表現するとどうなるか？

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = prevArray;
    newArray.push(1)
    return newArray
  })
},[])

だといくらボタンを押しても変化しない

Reactにおいてもイミュータブルが求められていて、元の値をそのまま変更するのではなく
新しい値を最終的に返す必要がある
そうしないと再レンダリングされない。

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = prevArray;
    newArray.push(1)
    console.log(newArray === prevArray)
    return newArray
  })
},[])
とするとずっとtrueになる。
比較したところnewArrayと prevArrayはtrueになるのでReact側は同じ値だと思ってしまう
同じ値なので再レンダリングされない
配列自体は増えているが同じものとして見られる

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, 1]
    console.log(newArray === prevArray)
    return newArray
  })
},[])
だとfalseになり1が追加されて表示される。
keyが同じなのでwarningは出る。

配列自体は同じように増えていくがnewArray はprevArrayとは違うのでちゃんとレンダリングする

Reactでもイミュータブルが求められていて前の値をそのまま変更してもだめで、
ちゃんと新しい値を作ってそれを返さなければいけない。

配列やオブジェクトはイミュータブルに扱わないといけない。


newArray やprevArrayのpushなどの挙動に関してはコンソールなどで確かめる

例えばコンソール上で
const foo = [];
と書くと
undefinedと表示される

そのあと
const bar = foo;
と書いてもundefined

bar.push(1);
と書くと
1と表示される

bar
と書くと
[1]と表示される

このときfooもすでに変わっていて
foo
と書くと
[1]と表示される

bar === foo
と書くと
true
になる戻す必要があったらしいので戻す

一度リセットして
const foo = [];

と書き直したあと
const bar = [...foo];

と書いて
bar.push(1);
とすると
1
となり

bar
は
[1]
となる。

foo
は変わらず
[]
のままで大丈夫になる

スプレッド構文を用いたことによってfooのイミュータブルさを担保できた。

ここでpushを使うことがNGで、改めて書くなら
const foo = [];
const bar = [...foo, 1];
と書く

Reactにおいてもイミュータブルが求められているのでpushなどの破壊的メソッドを使わず
配列オブジェクトをイミュータブルに扱っていく



const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, 1]
    console.log(newArray === prevArray)
    return newArray
  })
},[])
に戻したあと、自分で入れたテキストを追加ボタンでどんどん入れていくようにする。

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, text]
    console.log(newArray === prevArray)
    return newArray
  })
},[])
にするが、第二引数が空配列なのでtextが変わってもtextが最初の空文字のまま
このままだと空文字が追加される
なのでtextが変わったときに関数を再生成しないといけないので

const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    const newArray = [...prevArray, text]
    console.log(newArray === prevArray)
    return newArray
  })
},[text])
とする

textが同じ値だとkeyが同じになりwarningが出る。


const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    if(prevArray.some(item => item === text)){
      alert("同じ要素が既に存在します。")
      return prevArray
    }
    const newArray = [...prevArray, text]
    console.log(newArray === prevArray)
    return newArray
  })
},[text])

some()は配列のメソッドで()の中身で条件が合致するものがあればtrueを返して
ひとつも合致しなければfalseを返す。

itemはprevArrayの配列のそれぞれの中身、順繰りと確認
過去の配列の中身を一つずつ見て、textと同じものがあるかを精査する。

ひとつでも合致するものがあればalertして今の配列を返す
prevArrayを返さないと終わらない。


const handleAdd = useCallback(() => {
  setArray((prevArray) => {
    if(prevArray.some(item => item === text)){
      alert("同じ要素が既に存在します。")
      return prevArray
    }
    return [...prevArray, text]
  })
},[text])
でも同じ内容





----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #15】Custom Hooks（カスタムフック）の使い方、使いどころをマスターしよう！
https://www.youtube.com/watch?v=OTF2auzlBV0

AboutでもStateを使う

indexの内容をaboutに貼り付けてimportも追加する

<title>About Page</title>
<Main page="about" />
はそのままにしておく

<button>などをコンポーネントにしてしまうことも可能だが、今回はカスタムフックを使う

## カスタムフックを使った共通化

### index.jsでカスタムフックを作る

{isShow ? <h1>{count}</h1> : null}
<button onClick={handleClick}>ボタン</button>
<button onClick={handleDisplay}>{isShow ? "非表示" : "表示"}</button>
<input type="text" value={text} onChange={handleChange} />
<button onClick={handleAdd}>追加</button>
<ul>
  {array.map(item => {
    return(
      <li key={item}>{item}</li>
    )
  })}
</ul>
は大きく２つに分けられる

{isShow ? <h1>{count}</h1> : null}
<button onClick={handleClick}>ボタン</button>
<button onClick={handleDisplay}>{isShow ? "非表示" : "表示"}</button>
と
<input type="text" value={text} onChange={handleChange} />
<button onClick={handleAdd}>追加</button>
<ul>
  {array.map(item => {
    return(
      <li key={item}>{item}</li>
    )
  })}
</ul>
に

上はボタンを押すとカウントされたり表示非表示が切り替わったりする
下はインプットにテキストを入れるとそこに表示され、追加でリストに追加される
上と下はあまり干渉しないのでこの単位で分ける

まず以下をまとめてカスタムフックにする
const [count, setCount] = useState(1)
const [isShow, setIsShow] = useState(true)
const handleClick = useCallback(() => {
const handleDisplay = useCallback(() =>{

カスタムフックは必ずuseから名前を始める


export default function Home() {
の外に作成

const useCounter = () => {
  const [count, setCount] = useState(1)
  const [isShow, setIsShow] = useState(true)
  const handleClick = useCallback(() => {
    console.log(count)
    if(count < 10){
      setCount((prevCount) => prevCount + 1)
    }
  },[count])
  const handleDisplay = useCallback(() =>{
    setIsShow(prevIsShow => !prevIsShow)
  },[])

  return {count, isShow, handleClick, handleDisplay}
}

としてuseCounterの中に全部入れる
return で返す

export default function Home() {
の中に
const {count, isShow, handleClick, handleDisplay} = useCounter()
と入れてやるとこれで動く

HomeにあったuseStateやhandle～などの関数をそのままuseCouterを作ってその中に配置。
使うものだけをreturnする。

以下も同様にできる。
const useInputArray = () => {
  const [text, setText] = useState("")
  const [array, setArray] = useState([])

  const handleChange = useCallback((e) => {
    if(e.target.value.length > 5){
      alert("5文字以内にしてください")
      return
    }
    setText(e.target.value.trim())
  }, [])

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if(prevArray.some(item => item === text)){
        alert("同じ要素が既に存在します。")
        return prevArray
      }
      const newArray = [...prevArray, text]
      console.log(newArray === prevArray)
      return newArray
    })
  },[text])
  return {text, array, handleChange, handleAdd}
}

const {text, array, handleChange, handleAdd} = useInputArray()

使う前と比べて見やすくなった
return文までの記述が短くなっているのもわかりやすなった理由
Conterに関するものやInputArrayに関するものまとめることができたというのもわかりやすなった理由

useEffectもカスタムフックで分けても良い

const useBgLightBlue = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "lightblue"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])
}
とする。
returnはしなくていいのでそのまま
useBgLightBlue()
とHomeの中に書いてやればよい

こうすることによって共通化がしやすくなる

これらを
export const useBgLightBlue = () => {
としてもよいがファイル分けして見やすくする

src/hooks
フォルダを作成
他にもlibsとかutilsという名前もアリ
何が入っているか理解できる名前であればOK


src/hooks/useCounter.jsかjsxを作成
カスタムフックはjsでもjsxでもどちらでも良いことが多い
今回はreactとアイコンで一目でわかるのでjsxにする

useCounter.jsxにuseCounter()の内容を全部貼り付ける（index.jsからは消す）
import { useCallback, useState } from "react";
と必要なものもimportする

const useCounter = () => {
は export をつける

以下のようになる
import { useCallback, useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(1)
  const [isShow, setIsShow] = useState(true)

  const handleClick = useCallback(() => {
    console.log(count)
    if(count < 10){
      setCount((prevCount) => prevCount + 1)
    }
  },[count])
  const handleDisplay = useCallback(() =>{
    setIsShow(prevIsShow => !prevIsShow)
  },[])

  return {count, isShow, handleClick, handleDisplay}
}

index.jsx内で
const {count, isShow, handleClick, handleDisplay} = useCounter()
を書き直すと（useCounterを一度消してまた書くだけでいい）
import { useCounter } from "@/src/hooks/useCounter";
と自動で書いてくれる

useInputArrayも同様にuseInputArray.jsxに独立させる
useBgLightBlueも

index.jsxの
import { useCallback, useEffect, useState } from "react";
はいらなくなったので消す

これでそのまま動くのでaboutも同様にする

## フックのルール

### フックを呼び出すのはトップレベルのみ

return文よりも前の方で呼び出す
returnの中で{useCounter}のような使い方はだめ


### フックを呼び出すのはReactの関数内のみ

フックを通常のJavaScript関数から呼び出さない

const foo = () => {
  const {text, array, handleChange, handleAdd} = useInputArray()
}
のような呼び出し方はしない。

use◯◯はReactに関するものであってJavaScriptの関数から呼んだらだめ

setStateやuseEffectはReactのコンポーネントに関するものなので
純粋なJavaScriptの関数で呼んでも意味がない

JavaScriptの関数かカスタムフックなのかというのがわかりにくくなるので
名前はuseから始めなければならない

Reactのトップレベルで呼び出さないといけないしreturn文で呼んではいけないし
JavaScriptの関数から呼んではいけない

カスタムフックでなくてJavaScriptのただの関数を作る場合、
useという名前を使うとややこしくなるので使ってはいけない


## カスタムフックで共通化するのと、コンポーネントにまとめて共通化する場合の違いについて

index.jsxの
<Header />
と
<Main page="index" />
の間の要素と宣言部分を抜き出してみる

const Foo = () => {
  const {count, isShow, handleClick, handleDisplay} = useCounter()
  const {text, array, handleChange, handleAdd} = useInputArray()
  useBgLightBlue()
  return (
    <>
      {isShow ? <h1>{count}</h1> : null}
      <button onClick={handleClick}>
        ボタン
      </button>
      <button onClick={handleDisplay}>
        {isShow ? "非表示" : "表示"}
      </button>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {array.map(item => {
          return(
            <li key={item}>{item}</li>
          )
        })}
      </ul>
    </>
  )
}

として<Foo />を元の場所に差し替える

<Header />
<Foo />
<Main page="index" />

これで問題なく動く

export const Foo = () => {
として
componentフォルダの中に別ファイルにしても呼び出すことはできる
カスタムフックでまとめなくても使える

カスタムフックを使ったほうがUIの自由度が高い

カスタムフックの利点で関心事を分けられる
indexとaboutで<h1>を<h2>にしたり場所を変えたりとちょっとUIを変えたい場合
そういうときにカスタムフックを使えば挙動は同じ動きをするけれど
UIは全く違うものにすることができる

コンポーネントとロジックをセットにしたい場合はコンポーネントに全部書き出してそのコンポーネントを共通化させるし
今回みたいに見た目は自由度を持たせたいけどロジックの部分は共通化させたいというときはカスタムフックを使うと便利

return文までの記述が短くなったり関心事を分離させることができるというのもカスタムフックのいい点


aboutが
export default function Home() {
になっていたので
export default function About() {
にする



----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #16】Stateのリフトアップでページ間やコンポーネント間で値を共通化しよう！
https://www.youtube.com/watch?v=Jhi2X4zkyPI

## Stateのリフトアップについて

前回、Indexの処理をaboutに移す際、コンポーネントにまとめるのではなくカスタムフックを用いて実現した。
カスタムフックを用いることでUIの部分と切り離してロジックの部分だけを共通化できる

現在、indexでカウントアップしたあとaboutに行くとカウントが戻ってしまい、そのままindexに行っても元に戻っている
コード自体はカスタムフックを用いて共通化することはできたが State(状態)自体は共通化できていない
ページを移動したり、
コンポーネントもそうだが、コンポーネントA、Bとあってもカスタムフックでコードを共通化できていても
状態が共通化できていないのでコンポーネントを移り変わってしまうと状態がリセットされてしまう。

これを解決する方法がStateのリフトアップ

Stateの共通化をするための方法は他のも沢山あり
外部のRedux、Recoil といったパッケージを使うのもOK

Contextと呼ばれるReactの発展的なものがあるのだがそういうものを用いて実現することもできる
Contextは色々と問題がある

一番基本的なものはStateのリフトアップというもの

まずはNext.js自体の話

今回index.jsxとabout.jsxはpagesと呼ばれるディレクトリの下に存在している
pagesと呼ばれるものはNext.jsで重要な意味を持つ
pagesにあるものがそのままパスとして使われる

pages間で状態を共通化させたいときに少し特殊なNext.js独自の記法を覚える必要がある・

その後、コンポーネントに間での状態の共通化についても説明する。

### pages間での状態の共通化

src\pages\_app.jsx
が必要

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}


<Component {...pageProps} />
は
export default function App({ Component, pageProps }) {
の引数のコンポーネント

これはpropsと一緒
export default function App(props) {
<props.Component {...props.pageProps} />
とまったく一緒
引数の方で分割代入をして簡潔に書けるようになっている。

Component は各ページの
export default function Home() {
や
export default function About() {
などが入ってくる

_appはpagesの親みたいな存在
index.jsxならHome()、about.jsxならAbout()がComponent に入ってくる

_app.jsxで
<Component {...pageProps} foo={123} />
と書いて
index.jsxで
export default function Home(props) {
  console.log(props)
と書くと
コンソールで{foo:123}と表示される
export default function About(props) {
でも同じ

_appでコンポーネントにPropsとして渡したものは各ページにPropsとして渡る

この仕組みを使えばAppの中で状態を定義してそれをコンポーネントに渡すことによって
各ページで状態を共通化できる。

index.jsxの
  const {count, isShow, handleClick, handleDisplay} = useCounter()
  const {text, array, handleChange, handleAdd} = useInputArray()
  useBgLightBlue()
を_app.jsxに移動させる

import { useCounter } from "@/src/hooks/useCounter";
import { useInputArray } from "@/src/hooks/useInputArray";
import { useBgLightBlue } from "@/src/hooks/useBgLightBlue";
も同様


import "@/src/styles/globals.css";
import Head from "next/head";
import { useCounter } from "@/src/hooks/useCounter";
import { useInputArray } from "@/src/hooks/useInputArray";
import { useBgLightBlue } from "@/src/hooks/useBgLightBlue";

export default function App({ Component, pageProps }) {
  const {count, isShow, handleClick, handleDisplay} = useCounter()
  const {text, array, handleChange, handleAdd} = useInputArray()
  useBgLightBlue()
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

その後
<Component {...pageProps} count={count} isShow={isShow} />
とすると処理が多くなり見通しが悪くなるので
 {count, isShow, handleClick, handleDisplay}などを一つのオブジェクトにまとめる

const {count, isShow, handleClick, handleDisplay} = useCounter()
を
const counter = useCounter()
とするとcounter.countなどの使い方ができる。

const {text, array, handleChange, handleAdd} = useInputArray()
は
const inputArray = useInputArray()
とする


そしてスプレッド構文で
<Component {...pageProps} {...counter} {...inputArray} />
とする

useBgLightBlue()
は特に返り値がないのでそのまま

これで
export default function Home(props) {
のpropsに値が行く

index.jsxで使うには
一つずつ
props.handleClickのように書き直してもいいが
分割代入で
const {count, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd} = props
とできる。

関数の引数レベルで分割代入を行うことも可能

export default function Home(props) {
を
export default function Home({count, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd}) {
にするのも良い

今回はindex.jsxに引数propsでabout.jsxは引数で分割代入を行っている

これだとindex.jsxとabout.jsxで移動しても値が引き継がれる

ページ間の状態の受け渡しに関しては _app.jsxに状態を引き上げる
いわゆるひとつのStateのリフトアップ
コンポーネントの親に渡してそこで定義したものをpropsとしてコンポーネントに渡す

**これはNext.jsのpage間での状態を共通化する手法でReactにはない。**
Reactにはpagesのような特殊な意味を持つディレクトリが存在しないので

そもそもReactはシングルページアプリケーションなのでNext.jsのようにページを沢山持つことはない。

### コンポーネント間での状態共通化

ReactやNext.jsでもページ関係なく下のコンポーネントで
状態を共通化させたいということはある

#### Mainコンポーネント

##### <Links />のITEMSを<Links />だけでなく<Headline />でも使いたい場合

<Links />のなかでITEMSを定義してmapで回しているが
ITEMSをStateに入れる。

export function Links() {
の中でreturnの外で
const [items, setItems] = useState(ITEMS)
と追加。
ITEMSを初期値にする

{ITEMS.map(item => {
はstateのを使いたいので
{items.map(item => {
に変更

import { useState } from "react";
も追加
自動補完で出る
import { useState } from "react/cjs/react.production.min";
だとだめだった。

const [items, setItems] = useState(ITEMS)
const handleReduce = useCallback(() => {
  setItems(prevItems => {
    return prevItems.slice(0, prevItems.length - 1)
  })
}, [])
と定義して
<button onClick={handleReduce}>減らす</button>
とボタンを作る

[1,2,3].slice(0,1)とコンソールでやると
[1]になる
[1,2,3].slice(0,2)だと
[1,2]になる
[1,2,3].slice(1,2)だと
[2]になる
[1,2,3].slice(1,3)だと
[2,3]になる
sliceを使うと元の配列を元にその配列に対して数を増減させて新しい配列を返す

実際に数字を入れるのは面倒なので動的に数字を取得する
return prevItems.slice(0, prevItems.length - 1)

これでボタンを押すたびにアイテムが一つ減る

このロジックというものをStateをリフトアップすることによって
親のコンポーネントで使ったり親のコンポーネントにある別の子コンポーネントでも使う

const [items, setItems] = useState(ITEMS)
const handleReduce = useCallback(() => {
  setItems(prevItems => {
    return prevItems.slice(0, prevItems.length - 1)
  })
}, [])
を親のMainに移す

import { useState, useCallback  } from "react";
もMainに移す

const ITEMS = [
もMainに移す

Linkにはpropsでitems, handleReduceがわたるので
export function Links(props) {
と引数を追加
または分割代入で
export function Links({items, handleReduce}) {
でもいい

MainからLinkにitemsとhandleReduceを渡すので
<Links items={items} handleReduce={handleReduce} />
とする

StateをリフトアップしたのでitemsをMainでも使えるようになった

<code className={classes.code}>{items.length}</code>
とするとアイテムの数が表示される

itemsを<Headline>コンポーネントに渡すこともできる

<p>
  Get started by editing&nbsp;
  {props.children}
</p>
を
<p>
  アイテムの数は {props.children} 個です。
</p>


handleReduceを<Headline>の中で行うこともできる
Headline の中に
<button onClick={props.handleReduce}>減らす</button>
を追加し
Mainで
<Headline page={props.page}  handleReduce={handleReduce}>
と書き換える

減らすボタンが２つあるがどっちを押しても機能する
バラバラに押しても同じ

<Links>コンポーネントでuseStateや useCallbackを使っていたらそこでしか使えないが
それらをリフトアップさせることによって<Main>コンポーネントの中でも使うことができるし
<Headline>に渡してその中で使うこともできる

かなり自由度が高いので設計をどうするかが各々のエンジニアの腕。

<Headline>の減らすボタンは消しておく

Stateのリフトアップはページ間で状態を共通化したいとき（Next.jsの場合）
_appを使って実現できる。

コンポーネント間での状態の共通化をするためのStateのリフトアップはReactでも使える

Stateの共通化に関しては沢山の手法がある。

アイテムの数はページ間では共通化してないのでaboutでは戻ってしまう。
共通化したければ_appにStateをリフトアップしてpropsで使う必要がある


----------------------------------------------------------------------
# 【Next.jsで学ぶReact講座 #17】useMemoの使い方、useRouterの使い方
https://www.youtube.com/watch?v=tcQCSwL7eGI

useMemoはReactの機能でuseRouterはNext.jsに備わっている機能


## useMemo

現在はindexでボタンを押すとカウントが1ずつ増えて行く
Aboutではindexのカウントと同じ数が表示されているが、これを2倍の数を表示させたい。
それを実現するためにuseMemoを使う。

Aboutの背景色はuseRouterを使って変更させる


About.jsxでcountを使っているところを探す
{isShow ? <h1>{count}</h1> : null}
を
{isShow ? <h1>{count * 2}</h1> : null}
でとりあえず2倍にはなる。
aboutでボタンを押すと2ずつ増える


2倍にした値をいろいろなところで使いたい場合

Aboutのcountは propsとしてわたっていて  pagesのpropsとしてわたっているということは _app.jsx で渡している

<Component {...pageProps} {...counter} {...inputArray} />
の{...counter}のところで渡しているので
useCounter()の中にcountが定義されている。

src\hooks\useCounter.jsx
の中のcountがAboutで使われている


二倍にするだけならuseCounter.jsxに
const doubleCount = count * 2;
と定義する

return {count, doubleCount, isShow, handleClick, handleDisplay}
として渡す。

これで _app.jsx の
const counter = useCounter()
にも doubleCount がわたるので

Aboutで
export default function About({count, doubleCount, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd}) {
として渡す

{isShow ? <h1>{doubleCount}</h1> : null}
とそのまま使う。

すると最初からAboutでは2になり、ボタンを押すごとに2ずつ増える
indexから移動すると2倍になってる。

これだけでもいいのだが、無駄がありパフォーマンス的によくない。

isShowの値が変わったときにdoubleCountがまた作られてしまう。
isShowが変更されても元の値を保持して新しく作り直さないようにしたい。
それを実現するためにuseMemoを使う

const doubleCount = useMemo(() => {
  return count * 2
},[count]);

と書き換える。
useMemoとやれば自動でimportにも追加される。
こちらも第二引数に配列を入れる。

この第二引数が空配列だと最初に生成されてそれから生成されることがなくなるので（ボタンを押しても値が変わらない）
countが更新されたらもう一回更新されるように第二引数にはcountを入れる

useCallbackやuseEffectと同じ
第二引数の配列に入れた変数の値が変化すると新しく作り直される

const doubleCount = count * 2;
だと
isShowのstateがtrueやfalseと変わった段階でまた作られてしまう
isShowの値はcount * 2の計算とは関係がないので新しく作り直す必要はないのだが作り直されてしまう。

useMemoだとisShowが変わってもcountさえ変わらなければ新たに生成されることはない。


Reactのコンポーネント内で何かを定義するときはすべてに対してuseMemo、
関数だったらuseCallbackを使っていい。

今回のuseMemoはパフォーマンスが良くなる例だが
useMemoを使うと逆にパフォーマンスが悪くなる場合がある。
useCallbackも同様

useMemoやuseCallbackも中で計算ロジックがあるわけで
もしuseMemoが必要ない場面で使ってしまうとその分パフォーマンスが悪くなる。

ただ、それでもuseMemoやuseCallbackを全てに使ってよい。
その計算ロジックで失われるパフォーマンスが本当に微々たるものなのでそこまで気にする必要がない

それ以上にエンジニアが値を再生成させるべきか、させないべきかというのをちゃんとハンドルできるかどうか
それを意識つけるためにもすべてにuseMemoやuseCallbackを使うのはアリ

useMemoを使うと第二引数に変な値を入れたり足りなかったりすると意図した挙動にならない
useMemoやuseCallbackを全てに使うことによって普段からこの値は再生成させるべきなのかさせないべきなのか意識できるようになる。

それをやることでパフォーマンスに対する意識も高まる。
変な再生性もされなくなるのでパフォーマンスが良くなる


Aboutではただのcountは使われなくなったので消しておく
export default function About({ doubleCount, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd}) {



## useRouter

indexとaboutの背景色が一緒なのでuseRouterを使って変える

_app.jsxの中で useBgLightBlue() を使っているのでどっちもライトブルーになってしまう。

useBgLightBlue.jsxはuseEffectの中で
document.body.style.backgroundColor = "lightblue"
としている

なのでどのページでもライトブルーになる
これを変える

IndexなのかAboutなのか判断させてそれに応じて色を変える

import { useRouter } from "next/router"
import { useEffect } from "react"

export const useBgLightBlue = () => {
  const router = useRouter()
  console.log(router)
  useEffect(() => {
    document.body.style.backgroundColor = "lightblue"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])
}

としてuseRouterからrouterを追加して、importもする。
routerをlogで確認するとobjectの内容が見られる
沢山のプロパティがあるが pathname を使う
Aboutなら pathname: "/about" となっているのでこれを使って判断させる

三項演算子を使い
document.body.style.backgroundColor = router.pathname === "/" ? "lightblue" : "beige"
とするとIndexは router.pathname === "/" なのでライトブルーになり、Aboutはそうではないのでベージュになる。
しかし、第二引数にrouter.pathname がないとIndexでもAboutでも最初の色から変わらない。
最初がIndexならライトブルーでAboutにしてもライトブルー、最初がAboutならどちらもベージュ

import { useRouter } from "next/router"
import { useEffect } from "react"

export const useBgLightBlue = () => {
  const router = useRouter()
  console.log(router)
  useEffect(() => {
    document.body.style.backgroundColor = router.pathname === "/" ? "lightblue" : "beige"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [router.pathname])
}

とするとページが変わるとrouter.pathnameが変わりもう一回実行されて色が変わる。

routerの中身のプロパティやメソッドは「next router」で検索すると出る
https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router
で調べる。
「router オブジェクト」に書いてある

### useMemoを使う

import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

export const useBgLightBlue = () => {
  const router = useRouter()
  console.log(router)
  const bgColor = useMemo(() => {
    return router.pathname === "/" ? "lightblue" : "beige"
  }, [router.pathname])
  useEffect(() => {
    document.body.style.backgroundColor = bgColor
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [bgColor])
}
とするとuseMemoでrouter.pathnameが変わるたびに実行されbgColorを返し、
useEffectでbgColorが変わるたびに背景色が変わる

これでもよい
const bgColor = useMemo(() => {
  switch(router.pathname){
    case "/": {
      return "lightblue"
    }
    case "/about": {
      return "beige"
    }
    default:{
      return ""
    }
  }
}, [router.pathname])

useBgLightBlue
のところを
export const useBgColor = () => {
としてファイル名もuseBgColor.jsxに変える。

import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

export const useBgColor = () => {
  const router = useRouter()
  console.log(router)
  const bgColor = useMemo(() => {
    switch(router.pathname){
      case "/": {
        return "lightblue"
      }
      case "/about": {
        return "beige"
      }
      default:{
        return ""
      }
    }
    // return router.pathname === "/" ? "lightblue" : "beige"
  }, [router.pathname])
  useEffect(() => {
    document.body.style.backgroundColor = bgColor
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [bgColor])
}

すると_app.jsxも自動で
import { useBgLightBlue } from "@/src/hooks/useBgColor";
とimportを書き換えてくれるがカッコの中は変わらないので手動で変える。

import { useBgColor } from "@/src/hooks/useBgColor";
useBgColor()
とする

useMemoはReactの機能なので素のReactでも使える

useRouterはNext.js限定の機能


## リファクタリング

### _app.jsxのfunctionをアロー関数に書き換える

export default function App({ Component, pageProps }) {
を
export default const App = ({ Component, pageProps }) => {
にするとエラーになってしまう。

export default function だとこのままではアロー関数にできない。
一行ではできない。

const App = ({ Component, pageProps }) => {
としたあとに
一番下に
export default App
と追加する




functionかアロー関数のどっちがいいのかはチームに従えばいい

書き方によって違いがあり、thisの扱いが違ったり、
ホスティング（関数の巻き上げ）があったりなかったり

最近のJavaScriptではthisを使うことはほぼない。
使わないほうがいい。

ホスティングもコンパイルの段階ですべて解決してくれるのでどっちでも差異がない。

アロー関数はTypeScriptで型定義をするときに楽になることがある

Next.jsにはいろいろな機能があり、SSRやSSGやISRなどがあるがそういうのを使うとき
TypeScriptを使おうとするとき、アロー関数ではなくfunctionを使うとややこしくなる。

Next.jsでなくてもReactでもアロー関数でやるほうがやりやすい事が多い。


### propsをそのまま使う

About.jsx
export default function About({ doubleCount, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd}) {
の書き方は動画ではpropsに書き換えてる
export default function About(props) {

propsを使えば handleClick とかの値が props でわたってきたものなのか
return文の前で定義されたものなのか区別しにくくなるので
props.handleClick と書くという考え


export default function About({ doubleCount, isShow, handleClick, handleDisplay, text, array, handleChange, handleAdd}) {
も
const About = (props) => {
としたあとに一番下に
export default About
とすればアロー関数にできる


### someからincludesに書き換え

src\hooks\useInputArray.jsx
の
if(prevArray.some(item => item === text)){
が冗長なので書き換える

prevArrayは配列だが、配列に直接文字列を入れている場合だと
someでくるくる回すのではなくてincludesというメソッドで簡潔に書くことができる

if(prevArray.includes(text)){
と書き換えられる

配列の中に直接文字列が入っているパターン（例：["foo", "bar"]など）なのでincludesができたが
[{label:"foo"}, {label:"bar"}]というパターンの場合はsomeでやって
中のlabelを取り出してそれを比較しないといけない

配列の中にオブジェクトというのはよく使われる


### その他
export function Footer() {
なども
export const Footer = () => {
と書き換えられる


src\components\Header\index.jsx
の
<Link href="/" className={classes.anchor}>
  Index
</Link>
<Link href="/about" className={classes.anchor}>
  About
</Link>
が冗長な表現なので直す



import Link from "next/link";
import classes from "./Header.module.css";

const NAV_ITEMS = [
  {href: "/", label: "Index"},
  {href: "/about", label: "About"},
]

export const Header = () => {
// export function Header() {
  return (
    <header className={classes.header}>
      {NAV_ITEMS.map((item) => {
        return (
          <Link key={item.href} href={item.href} className={classes.anchor}>
            {item.label}
          </Link>
        )
      })}
    </header>
  );
}


くるくる回す要素はkeyが必要なのでhrefなら被らないのでそれを使う

こうすればあとから増えたときに楽
const NAV_ITEMS = [
  {href: "/", label: "Index"},
  {href: "/about", label: "About"},
  {href: "/test", label: "Test"},
]