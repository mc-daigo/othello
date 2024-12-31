# リモートリポジトリ側のユーザー追加

## GitHubでの操作

- 管理者のアカウントでGitHubのリポジトリを選択して右上のSettingsを選択
- 左側のCollaboratorsを選択
- Add peopleボタンを押してダイアログにユーザー名かアドレスを入れて検索
- 対象のユーザーを選択して追加する
- 追加されるとCollaboratorsでそのメンバーが表示される

# ローカルリポジトリ側の設定

## SourceTreeの操作

### 認証

以下の操作がどこまで有効か不明。
やる必要がないのかもしれないし、GitHubのアカウントも一つだけしか登録できない。

- メニューの ツール - オプションからダイアログを表示
- 認証タブからアカウントの「追加」をクリック
- GitHubなら「ホスティングサービス」から「GitHub」を選択
- 「優先するプロトコル」は「HTTTPS」でも大丈夫だった
- 「認証」は「OAuth」を選択。ユーザー名は多分押せない
- 「OAuthトークンを再読み込み」を押す
    - ブラウザーが立ち上がり「Authorize SourcetreeForWindows」という画面が出る
    - Authorize atlassianを選択するとトークンを読み込む
    - Cancelを選択すると中止
- Backlogの場合はホスティングサービスとして「Azure DevOps」を選択、ホスティングサービスのURLにはBacklogのURLを入力するらしいが詳細不明

### クローン

とりあえずユーザー設定は後回しにして実行する。  
クローンが終わった後に変更する。

- Cloneボタンを押す
- リポジトリのURL（http～.git）とローカルのディレクトリ、リポジトリ名などを入力してクローンボタンを押す

### ローカルリポジトリの設定

- 対象のリポジトリ選択中に右上の「設定」ボタンを押すとリポジトリ設定ダイアログが表示
- ユーザー情報の「グローバルユーザー設定を使う」のチェックを外す
- フルネームとメールアドレスを入れる。アドレスはGitHubに登録したもの
- 自分がリモートリポジトリの管理者ではなく他のリモートリポジトリにユーザー追加されているならそちらのアドレスを入れる

### プッシュ時の設定

ユーザーのアカウント設定が完了していないとプッシュしたときにSelect an accountが出てくる

- 自分のアカウントが選択できるならやってみる
- ダメならAdd a new accountを選択
    - sign in with your browserを選択するとブラウザーが起動してそこから何か設定できる
    - もう一個を選択するとコードが出るのでそれをコピーして  
    https://github.com/login/device  
    に飛ぶとDevice Activation画面が出てコードを貼れるので貼り付けてからContinue
- どちらかのアドレスに（多分追加ユーザー側）メールが来る場合があり、そこで「View invitation」ボタンを押して先に進める場合もある

## コマンドラインでの操作

まずcdコマンドで該当するディレクトリに移動する。

### クローン

- git clone リポジトリURL
    - 例：  
    git clone https://github.com/daigotitan/GitTest.git  
    この場合、指定ディレクトリ内にさらにGitTestというディレクトリが作成されそこに.gitが作成される。  
    なのであらかじめGitTestというディレクトリを作成してそこでクローンするとさらにGitTestというディレクトリができてしまうので注意。

### ローカルリポジトリの設定

#### アカウントを設定する

- git config user.name  
  git config user.email  
  で現在の設定を確認し、  
  git config user.name [name]
  のようにして設定を上書きできる。


その後、実際にpushしようとすると別ウィンドウが開いてログインとパスワードを求められたりしますが、そこは案内に従うだけなので迷うことはあまりないかと思います。


#### プロジェクト（ディレクトリ）ごとにアカウント設定を変更する

- git config --local user.name [name]
- git config --local user.email [email]

例：  
- git config --local user.name daigo-furuuchi
- git config --local user.email daigo_furuuchi@yahoo.co.jp


この--localを付けることでディレクトリ単位での初期設定を変更できます。  
優先度はlocal > global > systemとのこと。

つまり同じgit config user.nameコマンドを入力しても、local設定が存在するディレクトリと存在しないディレクトリで結果が変わることになります。

なので、例えば、globalの初期設定は仕事用アカウントにしておいて、プライベートのプロジェクトだけlocalで設定しておけば、間違えて別のアカウントで作ったリポジトリにpushしてしまうということも防げる……はず。


## Backlogでの操作

ルールを追加から「ブランチ名パターン」を決めておいたり「プッシュできるユーザーまたはチーム」を追加する必要がある（ないかも？）


### BacklogのリモートリポジトリをSourceTreeでクローンした場合

・Git Credential Mangerダイアログが起動
・Usernameとpasswordを入力する。
  それぞれリポジトリのユーザーのメールアドレスと各種パスワードを入れる。
・作ったばかりのリモートリポジトリをクローンした場合、ブランチが存在しないので適当なファイルをコミットしてmainブランチを作成させる必要がある。

# 参考サイト

- https://qiita.com/ryunosuke0922/items/15fa3ed9d5f35f497511
- https://qiita.com/ykoizumi0903/items/44e24d4180ae931552ce
- https://note.nkmk.me/git-config-setting/


===========================================
【Github】
daigotitan
https://github.co.jp/
https://github.com/daigotitan
https://github.com/daigotitan/mao-seminar
https://github.com/daigotitan/pull-request-practice
Username : daigotitan
Email : daigofuruuchi@gmail.com
pass : scheda999



https://github.com/daigotitan/GitTest
https://github.com/daigotitan/GitTest.git


---------------------------------------
Username : waodaigo
Email : wao_daigo@yahoo.co.jp
pass : scheda999

---------------------------------------
Username : daigo-furuuchi
Email : daigo_furuuchi@yahoo.co.jp
pass : scheda999
git用パスフレーズ：scheda999


===========================================
【Github】
mc_daigo
https://github.com/mc-daigo

Username : mc-daigo
Email : tanishisama@yahoo.co.jp
pass : scheda999

公開ページ
https://mc-daigo.github.io/portfolio/
https://mc-daigo.github.io/portfolio/javascript/
https://github.com/mc-daigo/portfolio.git


XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ユーザー切り替え
https://qiita.com/ryunosuke0922/items/15fa3ed9d5f35f497511

https://qiita.com/ykoizumi0903/items/44e24d4180ae931552ce

https://note.nkmk.me/git-config-setting/


git config --local user.name daigo-furuuchi
git config --local user.email daigo_furuuchi@yahoo.co.jp
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


==============================
同じパソコンのSourceTreeを使って別のユーザー（Eメール）で使い分けたい。
どのようにすれば実現できるか？

---------------------------------------
SourceTreeで複数のユーザー（Eメール）を使い分けるには、以下の手順に従ってください。

アカウントの追加: SourceTreeを開き、メニューバーから「ツール」→「オプション」を選択します。左側のメニューで「認証」を選択し、「アカウントを追加」をクリックします。
新しいアカウントの設定: ダイアログボックスが表示されるので、新しいユーザーのEメールアドレスとパスワードを入力し、「認証」ボタンをクリックします。
アカウントの切り替え: メニューバーの右上にあるアイコンから、切り替えたいアカウントを選択します。これにより、ソース管理システムに接続されているリポジトリがそのアカウントに切り替わります。
以上の手順で、SourceTreeを同じパソコンで複数のユーザー（Eメール）で使い分けることができます。

==============================
認証のアカウント追加はあるがそこからEメール入力ができない。
選べる項目は以下の通り
・Host
　-ホスティングサービス
　-優先するプロトコル
・Credentials
　-認証
　-ユーザー名

ホスティングサービスはとりあえずGitHub、優先するプロトコルはHTTTPSでいいがCredentialsの認証を何を選べばいいかわからない。
OAuthとPersonal Access Tokenから選ぶようだった。
ユーザー名はメールアドレスか？
OAuthトークンを再読み込みというボタンがあり、一度押せたがその後は押せなくなった。
---------------------------------------

Credentialsの認証方法としては、GitHubの場合、通常はOAuthを選択します。OAuthを選択した場合、SourceTreeはGitHubにリダイレクトされ、GitHubでアプリケーションへのアクセスを許可するためのページが表示されます。そこで、「許可」をクリックすると、SourceTreeがGitHubにアクセスできるようになります。

ユーザー名にはGitHubのユーザー名を入力します。また、Personal Access Tokenを使う場合は、GitHubのサイトでトークンを生成して、SourceTreeにコピー＆ペーストします。

OAuthトークンを再読み込みボタンが押せなくなった場合、SourceTreeを再起動してみるか、一度認証を解除してから再度追加することでトークンを再読み込みできるかもしれません。

==============================
OAuthトークンを再読み込みを押すとブラウザに
Authorize SourcetreeForWindows
という画面が出た。
CancelかAuthorize atlassianを選べるがどうするべきか？
---------------------------------------
"Authorize SourcetreeForWindows" 画面が表示された場合、"Authorize" を選択してください。これにより、SourceTreeがAtlassianのサービスにアクセスし、トークンを再読み込みすることができます。 "Cancel" を選択すると、認証プロセスが中止され、トークンは再読み込みされません。


==============================
Backlogのアカウントを追加する場合はどうすればよかったか？
---------------------------------------

BacklogのアカウントをSourceTreeに追加するには、以下の手順に従います。

SourceTreeを開き、メニューバーから「ツール」→「オプション」を選択します。
左側のメニューで「認証」を選択し、「アカウントを追加」をクリックします。
ホスティングサービスとして「その他」を選択します。
ホスティングサービスのURLにはBacklogのURLを入力します。
優先するプロトコルはHTTPSを選択します。
Credentialsの認証方法としては、おそらくBasic認証またはOAuthが必要になるかと思います。Backlogの場合、Basic認証を使用することが一般的です。Basic認証を選択し、ユーザー名とパスワードを入力します。
認証情報を追加した後、アカウントを選択して認証を完了します。
これでSourceTreeからBacklogアカウントにアクセスできるようになります。ただし、Backlogの認証方法や設定によっては、手順が異なる場合がありますので、Backlogの公式ドキュメントやサポートを参照することをお勧めします。


==============================
その他は選べない。
Azure DevOpsというのなら選べて、そこならホストURLを入れることができるがこれでよいのか？
それとも別か？
---------------------------------------
その場合、SourceTreeでBacklogのアカウントを追加する方法は次のようになります。

SourceTreeを開き、メニューバーから「ツール」→「オプション」を選択します。
左側のメニューで「認証」を選択し、「アカウントを追加」をクリックします。
ホスティングサービスとして「Azure DevOps」を選択します。
ホスティングサービスのURLにはBacklogのURLを入力します。
優先するプロトコルはHTTPSを選択します。
認証方法としては、Basic認証やOAuthなどが使えるかもしれません。一般的にはBasic認証を使用することが多いです。Basic認証を選択し、ユーザー名とパスワードを入力します。
認証情報を追加した後、アカウントを選択して認証を完了します。
これでSourceTreeからBacklogアカウントにアクセスできるようになります。ただし、認証方法や設定によっては手順が異なる場合がありますので、Backlogの公式ドキュメントやサポートを参照することをお勧めします。



==============================
GitHubのユーザー追加に戻る。
一度認証からメインのユーザーを追加した後、サブのユーザーをGitHubを使えるように追加したい。
認証から追加をしてOAuthトークンを再読み込みボタンを押してもアカウントがすでに存在しますとなってこれ以上追加できない。
どうすればいいか？

---------------------------------------
GitHubのアカウントをSourceTreeに追加する場合、OAuthトークンを使用して追加すると、同じGitHubアカウントを再度追加することはできません。メインのユーザーとサブのユーザーを切り替える場合は、次のような方法が考えられます。

1.OAuthトークンを削除: メインのユーザーのOAuthトークンをSourceTreeから削除します。これにより、メインのユーザーのアカウントがSourceTreeから削除されます。削除するには、SourceTreeのオプションからアカウントを選択し、削除することができます。
2.サブのユーザーを追加: OAuthトークンを使用してサブのユーザーを追加します。SourceTreeで新しいアカウントを追加し、OAuthトークンを入力してサブのユーザーを認証します。
3.切り替え: SourceTreeのユーザー切り替え機能を使用して、メインのユーザーとサブのユーザーを切り替えます。これにより、必要に応じてメインのユーザーやサブのユーザーで作業をすることができます。
これらの手順に従うことで、SourceTreeでメインのユーザーとサブのユーザーを切り替えることができます。

==============================
1は無意味なのでやらない。2は「新しいアカウントを追加」そのものができないので不可能。
3の方法を詳しく説明してほしい。
---------------------------------------
申し訳ありません、誤解がありました。以下に、SourceTreeでユーザーを切り替える方法を詳しく説明します。

メインのユーザーとサブのユーザーを追加: 最初にメインのユーザーをOAuthトークンを使用して追加します。その後、サブのユーザーをOAuthトークンを使用して追加します。
ユーザーの切り替え:
SourceTreeを開きます。
メニューバーの右上にあるアイコンをクリックして、現在のアカウントを表示します。
表示されたメニューから、切り替えたいアカウントを選択します。これにより、アカウントが切り替わり、指定したアカウントでリポジトリにアクセスできるようになります。
リポジトリの切り替え:
リポジトリ一覧から、切り替えたいリポジトリを右クリックします。
表示されたメニューから、"Switch To"を選択します。
切り替えたいアカウントが表示されるので、その中から選択します。これにより、選択したアカウントでリポジトリが切り替わります。
この方法で、SourceTreeでメインのユーザーとサブのユーザーを切り替えることができます。


==============================
