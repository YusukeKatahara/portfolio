# bigdogdig.com — Portfolio

片原悠介のポートフォリオサイト。**一枚の深い縦スクロールページ**。
純白の紙に Impact の黒、差し色は「いま居る場所」を示す紫のドットだけ。

- モックアップ: `docs/mockup_en.pdf`（`.ai` 原本も同ディレクトリ）
- 技術: [Astro](https://astro.build)（静的生成） + Cloudflare Workers（Static Assets）
- 言語: 英語のみ（日本語版は将来 `/ja/` として追加予定）

## 画面構成（上から順に）

| セクション | id | ナビ表示 | 図 |
|---|---|---|---|
| HERO（DREAM BIG / BE YOUR DOG / DIG DEEPER） | `#hero` | ナビ非表示 | 文字そのものが絵（下記） |
| ABOUT ME — Who I am（名前・DIG/BUILD/TEST・Career/Style/Hobbies タブ） | `#who-i-am` | ABOUT ME › Who I am | 経歴の年表（旗） |
| ABOUT ME — How I work（Your Dream is OUR Dream） | `#how-i-work` | ABOUT ME › How I work | `BuddyDream` 2人が同じ夢を見る |
| ABOUT ME — What I do（EMPOWER、For Clients / For Recruiters タブ） | `#what-i-do` | ABOUT ME › What I do | `EmpowerSteps` 支え → 自走 |
| SKILLS（Knowledge / Tools） | `#skills` | SKILLS | `SkillsLoop` 体→信号→モデル→制御 |
| PROJECTS — taVNS | `#tavns` | PROJECTS › taVNS | 3枚組 `TavnsWhy` / `TavnsRig` / `TavnsPanel` |
| PROJECTS — V EFFECT | `#v-effect` | PROJECTS › V EFFECT | 2枚組 `VeffectApp` / `VeffectGrowth` |
| MOONSHOT — Goals（CHOICE / ACTION / CONTINUITY） | `#goals` | MOONSHOT › Goals | `PillarChoice` / `PillarAction` / `PillarContinuity` |
| MOONSHOT — MILESTONES（チェックリスト） | `#milestones` | MOONSHOT › MILESTONES | 7つのゴールを貫く一本の道 |
| CONTACT（For clients フォーム / For recruiters 手紙） | `#contact` | CONTACT | — |

### HERO
3行のコピー自体が絵になっている。

- **両端揃え**: 3行を同じ幅に揃える。字間を開けて揃えると Impact の塊としての力が落ちるので、**行ごとに文字サイズを変えて**揃えている。`--w` がその行の幅（em）で、文字サイズは行幅から逆算する（`calc(100cqw / var(--w))`）
- **全体の大きさ**: `.hero` の `--hero-w`（既定 `min(100%, 80rem, 86vh)`）が 3行の塊とその下の情報に共通の幅。ここを変えると HERO 全体が拡大縮小する。`86vh` は縦に溢れないための上限
- **BIG / DOG / DIG** だけ紫（`.hero-key`）。縦に拾うとドメイン名 bigdogdig になる
- **地面**: 3行の下端とタグラインの中間に、白い帯 × `mix-blend-mode: difference` を敷いている（`.hero-ground`）。白地は黒へ、黒い文字は白へ反転するので、そこから下は「掘った土の中」になる。`.screen--hero` の背景色を消すと difference が効かなくなるので注意

コピーを変えたら `--w` を測り直す。Impact の送り幅（em）を足し合わせ、2% ほど余裕を足した値にする。

| D | R | E | A | M | B | I | G | Y | O | U | P | 空白 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| .552 | .539 | .415 | .533 | .717 | .552 | .288 | .551 | .473 | .546 | .547 | .502 | .177 |

例: `DREAM BIG` = .552+.539+.415+.533+.717+.177+.552+.288+.551 = 4.324 → `--w: 4.41`

2% の余裕は、Impact の無い端末（iOS / Android）で Anton に落ちたときに右端がはみ出さないための保険。
差は `.hero-line-inner` の `space-between` が吸収するので、多少ずれても両端は揃う。
表に無い文字の送り幅は、その文字を 9 個並べた画像の幅と 1 個の幅の差 ÷ 8 で測れる（`node_modules/sharp` で Impact を PNG に焼き、`trim()` の結果幅を使う）。

左ナビはスクロール位置に追従して、現在のセクションを大きく表示し、そのサブ項目だけを展開する。
モバイル（768px 未満）では上部固定バー（現在地 + MENU）になる。

## コマンド

```bash
npm install        # 初回のみ
npm run dev        # 開発サーバー http://localhost:4321
npm run build      # 本番ビルド → dist/
npm run preview    # ビルド結果の確認
```

## コンテンツの編集場所

| 内容 | ファイル |
|---|---|
| **全ての文言**（ナビ・各セクション・フォーム・手紙） | `src/data/copy.en.ts` |
| 文言の型（日本語版を作るときは同じ型で `copy.ja.ts` を作る） | `src/data/types.ts` |
| SNSリンク・フォーム設定・メールアドレス | `src/site.config.ts` |
| 配色・フォント・サイズ | `src/styles/global.css` の `:root` |

- MILESTONES のチェックは `copy.en.ts` の `milestones` で `done: true` を付ける。`done` を1つでも含むゴールは道の上の点が紫になる
- 経歴の年表（旗）は `who.career` の配列。点数を変えても等間隔に自動配置される
- プロジェクトの図は `copy.en.ts` の `plates[]`（`visual` で図を選び、`title` と `caption` を添える）。横幅は `weight` の比で決まる（既定 1。情報量の多い図に多めに振る）。図・見出し・説明の行は `subgrid` で揃うので、縦横比は figure ごとに違ってよい。MOONSHOT の柱は `pillars[].visual`

### 2026-11-05 改修メモ

- **HERO 下部**: 名前・一文サマリ・実績4点・SNS/CV リンクを地面の下に置いた（文言は `copy.hero`）。`--hero-w` の高さ上限は 80vh に下げてある
- **ポートレート差し込み口**: `src/assets/portrait.jpg`（.png / .webp でも可）を置くと Who I am の名前横に自動で写真が出る。無い間は「YK」モノグラムパネル（DIG · BUILD · TEST の帯付き）が表示される
- **CV**: `/cv/`（`src/pages/cv.astro`）。copy と config だけから生成するので、事実を直すときは copy 側だけ直せばよい。印刷 CSS 付き（PDF が要る場合はブラウザ印刷で保存）
- **OGP**: PNG は置かない。`src/pages/og.png.ts` がビルド時に SVG を sharp で焼いて生成する
- **論文の扱い**: 論文は「記録」であって売り文句にしない。HERO・OGP・メタ説明には載せない。引用は taVNS 脚注と CV の Publications に通常の書誌情報（DOI リンク付き）としてのみ置く
- **フッター**: `src/components/Footer.astro`（SNS・メール・CV・Back to top）

## 図（`src/components/visuals/`）

読まなくても内容が伝わることを狙った説明図。原則はインライン SVG で、外部画像もライブラリも使わない。

ただし **PROJECTS の図は例外**で、研究・製品で実際に使っている資料をそのまま載せている。
説明のために描き直した図ではなく実物なので、リアルさが伝わることを優先した。

元素材は `assets/`（**リポジトリには入れていない。手元にのみ置く**）。
サイトのビルドが使うのは、そこから切り出して `src/assets/` に置いたものだけ。

| 図 | 実物 | 伝えたいこと |
|---|---|---|
| `TavnsWhy` | `assets/taVNSFIG_previous_VNS.jpg` + `assets/taVNSFIG_taVNS.png` | 埋め込み型 VNS は首の手術。taVNS は同じ神経に耳のクリップだけで届く |
| `TavnsRig` | `assets/taVNSFIG_実験概要.svg` | 1セッションで 8 チャンネルを同時計測している |
| `VeffectApp` | `assets/VEFFECTFIG_icon.png` | 試作ではなく App Store に出ている実物 |
| `TavnsPanel` | （`assets/taVNSFIG_VI_FrontPanel_image.svg` を下敷きに描き直し） | 記録ソフト（LabVIEW の VI）を自分で作っている |

### 実物を載せるときの扱い

**ラスタ画像**（`TavnsWhy` / `VeffectApp`）は `astro:assets` の `<Image>` に通して WebP + srcset を吐かせる。
原本は `src/assets/`。`TavnsWhy` の 2 枚は、並べたときに頭の大きさが揃うよう正方形に切り出してある:

| リポジトリに入るもの | 元（手元の `assets/`） | 切り出し（left, top, size） |
|---|---|---|
| `src/assets/tavns-implant.jpg` | `assets/taVNSFIG_previous_VNS.jpg` | 200, 176, 682 |
| `src/assets/tavns-ear.png` | `assets/taVNSFIG_taVNS.png` | 22, 44, 980 |
| `src/assets/veffect-icon.png` | `assets/VEFFECTFIG_icon.png` | 切り出しなし。角丸は `.app-icon` の `border-radius: 22%`（iOS と同じ比率） |

**SVG**（`TavnsRig`）は `?raw` で読んで `set:html` で埋め込む。原本 `src/assets/tavns-rig.svg` は無加工で、
`TavnsRig.astro` 側が読み込み時に次を行う:

- `.st0 …` → `.rig-st0 …` へ改名（インライン SVG の `<style>` はページ全体に効くため）
- viewBox を余白の分だけ詰める（`0 0 926.71 595.28` → `-12 106 1010 452`）
- ラベルは `.vis--rig text` で 25px・ページのフォントに置き換え、白いハロ（縁取り）で配線の上でも読めるようにする。原図の 12px はこの表示幅では読めないため。
  拡大すると図に重なる・はみ出す 5 つ（`PPG (wearable device)` / `ECG (wearable device)` / `PPG` / `GSR` / `continuous blood pressure`）だけ、
  コンポーネント内の `MOVED` で位置を寄せている

描くときの決まり:

- **黒ベタの面**で形を作る。内部の構造（神経・心臓・散布図など）は**背景色で抜く**（`class="bg"` / `class="bgs"`）
- 色は SVG 側に書かない。`currentColor` = 文字色、`class="ac"`/`"acs"` = 紫。**紫は 1 図につき一点だけ**（そこを見てほしい場所）
- 図中のラベルは Impact の大文字。ページ内で縮んだときに読めるよう、viewBox 1280 なら 46〜48px を目安にする
- `_Figure.astro` で包むと `data-reveal` が付き、画面に入ったときにアニメーションする（`global.css` の `.vis--<kind>` に定義）
- アニメの初期値（`stroke-dashoffset` や `opacity: 0`）は `.js` 配下にだけ書く。JS 無効・`prefers-reduced-motion` でも完成形が見えるようにするため

## お問い合わせフォーム

[Web3Forms](https://web3forms.com) 経由で送信。アクセスキーは `src/site.config.ts`（公開前提の仕様）。
メールアドレスは bot 収集対策として分割して埋め込み、ブラウザ側で結合して表示する。

## デプロイ（Cloudflare Workers、手動）

GitHub への push だけでは反映されない。ビルドしたものを **手元から `wrangler` で明示的にデプロイ**する。

Worker 名は `portfolio`。ルーティング（`*.bigdogdig.com/*` → `portfolio`）は Cloudflare 側に設定済みで、
リポジトリ側の設定は `wrangler.toml` に集約している。

```bash
git pull            # GitHub 側で先に編集した場合
npm run build       # dist/ を生成
npx wrangler deploy # dist/ を portfolio（bigdogdig.com）へ反映
```

- 初回 / トークン失効時（実績: 約24時間で失効）は `npx wrangler deploy` の前に `npx wrangler login` が必要。
  ブラウザで Cloudflare アカウント（y.katahara.academia@gmail.com）にログイン・許可する
- デプロイ後は `https://bigdogdig.com` を確認する。CDN キャッシュは新バージョンへ即時切り替わる
- `wrangler.toml` の `compatibility_date` / `[assets] directory` を変えない限り、上記コマンドだけで完結する

## 構成

```
src/
  pages/index.astro          一枚ページ（セクションを順に並べる）
  pages/404.astro
  layouts/Base.astro         <head>・フォント読込・main.ts
  components/
    SideNav.astro            左ナビ（PC）兼 モバイルメニュー
    Screen.astro             1画面の共通ラッパー（min-height: 100vh）
    Tabs.astro               タブUI。同じ name のタブ群はページ内で同期
    CareerTimeline.astro     経歴の年表（SVG。モバイルではリスト）
    sections/*.astro         各セクション
    visuals/_Figure.astro    説明図の共通ラッパー（viewBox・代替テキスト・reveal）
    visuals/*.astro          各セクションの説明図
（assets/ は手元のみ。.gitignore 済み）
  scripts/main.ts            scrollspy・タブ・モバイルメニュー・フォーム送信・メール結合・reveal
  styles/global.css
  assets/                    ページに載せる実物（astro:assets / ?raw で読む）
  data/copy.en.ts, types.ts
  site.config.ts
```

- フォント: `font-family: Impact, 'Anton', …`。Impact は Windows / macOS のローカルフォント、無い端末（iOS / Android）は Google Fonts の Anton に切り替わる
- `prefers-reduced-motion` 環境ではスムーススクロールと遷移アニメーションを止める
