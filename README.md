# bigdogdig.com — Portfolio

片原佑介のポートフォリオサイト。紙白の幕に黒い影絵（藤城清治オマージュ）、
アイリッシュ・ウルフハウンドがカーソル（骨）を追いかけ、ナビをクリックすると
その場所を掘ってページが切り替わる。

- 設計書: `docs/DesignDocumentOfWebPortfolio.md`
- 技術: [Astro](https://astro.build)（静的生成） + Cloudflare Pages
- 言語: 日本語（デフォルト `/`）・英語（`/en/`）

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
| 経歴・スキル・ムーンショット・趣味 | `src/data/profile.ts` |
| UI文言（日英） | `src/i18n/ui.ts` |
| プロジェクト詳細（Markdown） | `src/content/projects/ja/*.md`・`en/*.md` |
| ブログ記事（Markdown） | `src/content/blog/ja/`・`en/`（`_template.md` をコピー） |
| プロフィール写真 | `src/assets/photos/` |
| SNSリンク・フォーム設定 | `src/site.config.ts` |

プロジェクト記事のfrontmatter: `title` / `summary` / `status`（`active`・`wip`・`tbd`）/ `order` / `tags` / `links`。

## お問い合わせフォームの有効化（未設定）

1. https://web3forms.com で自分のメールアドレスを入力してアクセスキーを無料発行
2. `src/site.config.ts` の `WEB3FORMS_ACCESS_KEY` を発行されたキーに差し替え

キーを差し替えるまで、Contactページは「準備中」の案内を表示する。
メールアドレス自体はサイト上に一切露出しない（キーは公開前提の仕様）。

## デプロイ（Cloudflare Pages）

1. このリポジトリを GitHub（`YusukeKatahara/portfolio`）へ push
2. Cloudflare ダッシュボード → Workers & Pages → Create → Pages → Connect to Git
3. ビルド設定: Framework preset = **Astro** / Build command = `npm run build` / Output = `dist`
4. デプロイ後、Custom domains で **bigdogdig.com** を追加（DNSは案内に従う）

以後は `git push` するだけで自動デプロイされる。

## 開発メモ

- 犬の行動エンジン: `src/scripts/den.ts`（追跡・忍び寄り・散歩・穴掘り・ボール遊び・伸び・遠吠え）
- 犬の造形: `src/components/DogSvg.astro`（パーツごとに `data-part` 属性、JSが回転を与える）
- ポーズ確認用ページ: `/dog-lab`（noindex・sitemap除外）
- ページ遷移: Astro View Transitions。`transition:persist` により犬とボールはページをまたいで生き続ける
- `prefers-reduced-motion` 環境ではアニメーションを止め、即時遷移にフォールバック
