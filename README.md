# bigdogdig.com — Portfolio

片原悠介のポートフォリオサイト。**一枚の深い縦スクロールページ**。
純白の紙に Impact の黒、差し色は「いま居る場所」を示す紫のドットだけ。

- モックアップ: `docs/mockup_en.pdf`（`.ai` 原本も同ディレクトリ）
- 技術: [Astro](https://astro.build)（静的生成） + Cloudflare Pages
- 言語: 英語のみ（日本語版は将来 `/ja/` として追加予定）

## 画面構成（上から順に）

| セクション | id | ナビ表示 |
|---|---|---|
| HERO（DREAM BIG / BE YOUR DOG / DIG DEEPER） | `#hero` | ナビ非表示 |
| ABOUT ME — Who I am（名前・DIG/BUILD/TEST・Career/Style/Hobbies タブ） | `#who-i-am` | ABOUT ME › Who I am |
| ABOUT ME — How I work（Your Dream is OUR Dream） | `#how-i-work` | ABOUT ME › How I work |
| ABOUT ME — What I do（EMPOWER、For Clients / For Recruiters タブ） | `#what-i-do` | ABOUT ME › What I do |
| SKILLS（Knowledge / Tools） | `#skills` | SKILLS |
| PROJECTS — taVNS | `#tavns` | PROJECTS › taVNS |
| PROJECTS — V EFFECT | `#v-effect` | PROJECTS › V EFFECT |
| MOONSHOT — GOALs（CHOICE / ACTION / CONTINUITY） | `#goals` | MOONSHOT › GOALs |
| MOONSHOT — MILESTONES（チェックリスト） | `#milestones` | MOONSHOT › MILESTONES |
| CONTACT（For clients フォーム / For recruiters 手紙） | `#contact` | CONTACT |

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

- MILESTONES のチェックは `copy.en.ts` の `milestones` で `done: true` を付ける
- 経歴の年表（旗）は `who.career` の配列。点数を変えても等間隔に自動配置される
- KEY VISUAL は枠を描かず余白だけ確保している（`src/components/KeyVisual.astro`）。画像やアニメーションを入れる場所

## お問い合わせフォーム

[Web3Forms](https://web3forms.com) 経由で送信。アクセスキーは `src/site.config.ts`（公開前提の仕様）。
メールアドレスは bot 収集対策として分割して埋め込み、ブラウザ側で結合して表示する。

## デプロイ（Cloudflare Pages）

GitHub（`YusukeKatahara/portfolio`）へ push すると自動デプロイ。
ビルド設定: Framework preset = **Astro** / Build command = `npm run build` / Output = `dist`

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
    KeyVisual.astro          KEY VISUAL の余白
    CareerTimeline.astro     経歴の年表（SVG。モバイルではリスト）
    sections/*.astro         各セクション
  scripts/main.ts            scrollspy・タブ・モバイルメニュー・フォーム送信・メール結合
  styles/global.css
  data/copy.en.ts, types.ts
  site.config.ts
```

- フォント: `font-family: Impact, 'Anton', …`。Impact は Windows / macOS のローカルフォント、無い端末（iOS / Android）は Google Fonts の Anton に切り替わる
- `prefers-reduced-motion` 環境ではスムーススクロールと遷移アニメーションを止める
