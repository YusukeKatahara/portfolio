/# PROJECTS セクション 草案（taVNS / V EFFECT / 次世代プロジェクト）

作成日: 2026-08-25
対象: `mockup-home.pdf` の新デザイン（一枚の縦スクロールページ）における PROJECTS セクション

## 0. 読み方

このファイルは「コピーを書き終えた完成品」ではなく、**明日そのまま拾って判断できる草案**です。各プロジェクトに

1. 方針の説明（なぜこう書いたか）
2. 一覧用ワンライナー（JA/EN）
3. 本文ドラフト（JA/EN、既存の `src/content/projects/**/*.md` と同じ frontmatter+body 形式 — そのままコピペで下地にできます）
4. 「私の関わり方」ボックス（本文から独立させた役割・価値の要約。既存ファイルの `## 学んだこと` 等と同じ立ち位置の見出しとして本文に included 済み）

を用意し、最後に **今後決めることリスト**（p.5）としてまとめています。質問はしていません、全て私の判断で仮決めしています。気に入らない箇所だけ直してください。

---

## 1. 全体設計思想 — PROJECTS は「3つの異なる関わり方」を見せる三部作

`about.philosophyBody` に既にある「深く掘る。広く繋ぐ。」と、モックアップの EMPOWER（Find Clarity → Design to Learn → Enable）を並べて眺めると、3つのプロジェクトはそれぞれ **違う立場から価値を生んでいる** ことに気づきます。これを PROJECTS セクション全体の裏の構造にしました。

| プロジェクト | 私の立場 | 価値の生み方 |
|---|---|---|
| taVNS | 独りで掘る研究者 | 問いを立てる→計測→解析→実装まで、分業せず一気通貫で動かす |
| V EFFECT | 伴走する EMPOWER の実践者 | 自分が手を動かすのではなく、Ren が自走できる環境を作り、困りごと・トラブル・方針決めで支える |
| 次世代プロジェクト | ゼロから起こす仕掛け人 | 機会を自分で見つけ、企画で終わらせず実際に動かす |

3枚並べたときに「この人は同じスキルセットを、3つの違う役割（研究者／伴走者／起業家）で使い分けられる人だ」と伝わることを狙っています。単体のプロジェクト説明ではなく、**関わり方のポートフォリオ**として読めるようにしてください。

この三部作構造は、For Recruiter（マネジメント能力・伴走力の証明）と For Individual Client（実行力・自走支援力の証明）の両方に効きます。

---

## 2. taVNS

### 2-1. 機密ガイドライン（最優先で読んでください）

研究アイデアの漏洩を避けるため、既存の `tavns.md` の抽象度を天井として、それを超えないように書きました。判断基準を明文化しておきます。

**書いてよいこと**
- taVNS 自体の仕組み（世界的に確立された非侵襲手法であり、公知の情報）
- 研究の「問い」を高いレベルで（＝既存コピーに既にある「ウェアラブル生体信号からどこまで定量できるか」と同水準まで）
- なぜ自分がこの研究に向いているか（経歴・スキルの組み合わせ、一気通貫で動かせること）
- taVNS 研究の一般的な意義（非侵襲・ウェアラブルヘルスケアとの親和性など、業界一般の話）
- 現状のステータス（博士1年、進行中、成果は準備中）
- 「仮説→デザイン→評価→学習」という研究サイクルの型（科学的方法論一般であり独自ノウハウではない）

**絶対に書かないこと**
- 具体的な特徴量・アルゴリズム・モデル構造・キャリブレーション手法のアイデア
- 途中結果や数値（説明率、精度、被験者間のばらつきの程度など）
- 用いている／候補にしている具体的な生体指標を並べて、狙いが読める組み合わせ方の記述
- データセットの詳細（被験者数、使用デバイスの型番、実験条件）
- 未発表論文の具体的なタイトルや構成
- 学会投稿の時期・内容の詳細

指導教員（飯島敦彦先生）・共同研究者（脳研究所）については、アカデミックな慣習としては公開して問題ない情報ですが、本人たちの意向を確認していないため **今回のドラフトには入れていません**。入れたい場合は p.5 の判断リストへ。

### 2-2. 一覧用ワンライナー

- JA: `taVNSという非侵襲の迷走神経刺激を軸に、問いを立てるところから計測・解析・実装まで、一人で一気通貫に動かす研究者です。`
- EN: `From research question to signal processing to implementation — I run taVNS research end to end, alone.`

### 2-3. 本文ドラフト（JA）

```markdown
---
title: taVNS研究
summary: taVNSという非侵襲の迷走神経刺激を軸に、問いを立てるところから計測・解析・実装まで、一人で一気通貫に動かす研究者です。
status: active
order: 1
tags: [生体医工学, 自律神経, PPG, 信号処理, 一気通貫]
links: []
---

耳介の皮膚のすぐ下には、迷走神経の枝が浅いところを走っている場所があります。そこに皮膚の上から微弱な電気刺激を与えて迷走神経を活性化させる手法が **taVNS（transcutaneous auricular Vagus Nerve Stimulation：経皮的耳介迷走神経刺激）** です。手術で電極を埋め込む従来の迷走神経刺激と違い、体を傷つけずに自律神経系へ働きかけられることから、非侵襲の神経刺激法として世界中で研究が進んでいます。

私が向き合っているのは、taVNSの効果を、実験室の大型装置ではなく日常で身につけられるウェアラブルセンサーからどこまで読み解けるか、という問いです。研究室でしか測れなかった自律神経・循環動態の指標を、体につけたままのセンサーで再現できれば、研究にも臨床応用にも、そして次のプロダクトにも大きな橋が架かります。

## 私の関わり方

この研究で私が担っているのは、問いを立てるところから、実験の設計、生体信号の計測・解析、必要であれば計測システムの実装までを、一人で一気通貫に動かすことです。生体医工学の知識、C・LabVIEWでの計測経験、MATLAB/Pythonでの信号処理・統計解析、そしてAIエージェントを使った開発——これらを組み合わせて、仮説をデザインし、評価し、学習し、次の仮説につなげるサイクルを自分の手で回しています。分業を前提にしない分、意思決定から実装までの距離が短いことが、研究の進め方の特徴です。

- **問いを立てる**：taVNSがもたらす自律神経への影響を、ウェアラブルで測れる形に翻訳する
- **一人で動かす**：実験設計・計測・信号処理・統計解析を、分業前提にせず一気通貫で担当
- **学びを資産にする**：仮説→デザイン→評価→学習のサイクルを回し、次の仮説へつなげる
- **橋を架ける**：研究の知見を、将来のプロダクトの種として育てる

## 論文・成果

現在は新潟大学大学院 博士後期課程1年としてこの研究に取り組んでいます。学内外の研究者とも連携しながら進めており、論文・成果は準備中です。公開できる段階になり次第、ここに掲載します。
```

### 2-4. 本文ドラフト（EN）

```markdown
---
title: taVNS Research
summary: From research question to signal processing to implementation — I run taVNS research end to end, alone.
status: active
order: 1
tags: [Biomedical engineering, Autonomic nervous system, PPG, Signal processing, End-to-end]
links: []
---

A branch of the vagus nerve runs close to the surface of the ear. **taVNS (transcutaneous auricular Vagus Nerve Stimulation)** activates it with a weak electrical stimulus applied through the skin there. Unlike conventional vagus nerve stimulation, which requires surgically implanted electrodes, taVNS can engage the autonomic nervous system non-invasively — which is why it's being studied worldwide as a non-invasive neuromodulation method.

The question I'm working on is how far taVNS's effects can be read out from everyday wearable sensors, rather than the large equipment found only in a lab. If indices of autonomic and circulatory function that used to require lab-grade instruments can be reproduced with a sensor worn on the body, it opens a bridge to research, to clinical use, and eventually to products.

## My role

What I actually do in this research is run the whole loop myself — framing the question, designing the experiment, collecting and analyzing biosignals, and building measurement systems when needed. Biomedical engineering knowledge, measurement experience in C and LabVIEW, signal processing and statistics in MATLAB/Python, and AI-agent-assisted development: I combine all of it to design, evaluate, and learn from each hypothesis, then carry that learning into the next one. Not assuming a division of labor keeps the distance between a decision and its implementation short.

- **Frame the question**: translate taVNS's effect on the autonomic nervous system into something a wearable can actually measure
- **Run it alone**: own the experiment design, measurement, signal processing and statistics end to end
- **Turn learning into an asset**: hypothesis → design → evaluate → learn, feeding each cycle into the next
- **Build the bridge**: grow research findings into the seed of a future product

## Papers & outcomes

I'm currently a 1st-year PhD student at Niigata University working on this, in collaboration with researchers inside and outside the university. Papers and results are in preparation and will be listed here as they become public.
```

---

## 3. V EFFECT

### 3-1. 位置づけ：EMPOWER の実例そのものとして書く

指示の通り、V EFFECT は「What I do」セクションの EMPOWER（自走できる環境を創ります）の実例に直結する項目です。モックアップの EMPOWER 本文にある

> 1. Find Clarity → 2. Design to Learn → 3. Enable
> 私無しで自立してプロジェクトが回るようになれば、その資産を持ったまま別プロジェクトに関わる余裕が生まれます。
> 事例：アプリ開発（V EFFECT）

という構造に、そのまま乗せられるように本文を組み立てました。Ren がほぼ自走している「今」を起点に、**Find Clarity（最初に一緒に整理）→ Design to Learn（今はRenが回す）→ Enable（困りごと・トラブル・方針決めで伴走）** という時間の流れを本文の中に埋め込んであります。「今どう関わっているか」を三つの具体的な場面（技術的な困りごと／緊急トラブル対応／方針決め）に分解し、コードを書く人ではなく環境を守る人として描いています。

### 3-2. 重要：既存コピーとの差分（要修正）

現行の `src/content/projects/{ja,en}/v-effect.md` は「企画・UI設計・実装・App Store審査・公開後の運用まで、**全工程を一人で**行っています」「tags: 個人開発 / Indie dev」となっており、**Renが自走開発している今の実態と逆行しています**。新デザイン実装時には、この一文とタグを必ず差し替えてください（下のドラフトはこの点を修正済みです）。

### 3-3. EMPOWER セクション用キャプション（短文）

`What I do → EMPOWER` の「事例：アプリ開発（V EFFECT）」の横に添える一文。PROJECTSの本文とリンクさせる想定です。

- JA: `事例：V EFFECT — Renが自立して開発を回すアプリを、困りごと・トラブル対応・方針決めで支えています。`
- EN: `Case: V EFFECT — Ren runs development independently now; I stay close for blockers, urgent fixes, and roadmap calls.`

### 3-4. 一覧用ワンライナー

- JA: `Renが自立して開発を進めるアプリに、伴走者として関わっています——困りごと、緊急のトラブル対応、そして次の一手を決める場面で。`
- EN: `Ren now runs V EFFECT's development independently — I stay close for blockers, urgent fixes, and deciding what's next.`

### 3-5. 本文ドラフト（JA）

```markdown
---
title: V EFFECT
summary: Renが自立して開発を進めるアプリに、伴走者として関わっています——困りごと、緊急のトラブル対応、そして次の一手を決める場面で。
status: active
order: 2
tags: [Flutter, Firebase, iOS, 伴走開発, EMPOWER]
links:
  - label: App Store
    url: https://apps.apple.com/jp/app/v-effect/id6763709764
  - label: 公式サイト
    url: https://veffect.web.app/
---

**V EFFECT** は、日々の努力を記録し、仲間と共有しながら習慣化していくSNSアプリです。「一人だと続かないことも、見てくれる誰かがいれば続く」——その効果を最大化することを狙って設計されました。Flutter + Firebase で実装され、現在App Storeで公開・運用中です。

開発を日々前に進めているのは、共同開発者のRenです。私の役割はコードを書くことではなく、Renが自立してプロジェクトを回し続けられる環境をつくることにあります。

はじめは、目指す姿・手法・ボトルネックを一緒に洗い出すところ（Find Clarity）から関わりました。そこから設計→実装→評価→学習というサイクル（Design to Learn）を回す中で、開発の主導権は次第にRenへ移っていきました。今では、その学習がチームの資産として積み上がり、私がいなくてもサイクルが回るところまで来ています（Enable）。

## 私の関わり方

今、私が実際に時間を使うのは主に三つの場面です。ひとつは、Renが手を止めてしまうような技術的な困りごとの相談役として。ひとつは、本番障害やストア審査対応など、スピードが問われるトラブル対応として。そしてもうひとつは、次にどの機能を伸ばすか、ユーザーの反応を見ながら方針を一緒に決める場面として。日々の実装そのものよりも、Renが安心して手を動かし続けられる土台を守ることに、時間を使っています。

- **Find Clarity**：目指す姿・手法・ボトルネックを最初に一緒に整理した
- **Design to Learn**：設計→実装→評価→学習のサイクルは、今はRenが自立して回している
- **Enable**：困りごと・緊急対応・方針決めで伴走し、チームに学習を積み上げる
- **成果**：私がいなくてもプロジェクトが前に進む状態をつくれた

チームの中に学習を積み重ね、自立してサイクルを回せるようにすること——それは、私が抜けてもプロジェクトが前に進み続けるということです。そしてそれは、その資産を持ったまま、私が次のプロジェクトに関わる余白が生まれるということでもあります。V EFFECTは、その考え方がうまく機能した実例です。
```

### 3-6. 本文ドラフト（EN）

```markdown
---
title: V EFFECT
summary: Ren now runs V EFFECT's development independently — I stay close for blockers, urgent fixes, and deciding what's next.
status: active
order: 2
tags: [Flutter, Firebase, iOS, Enablement, EMPOWER]
links:
  - label: App Store
    url: https://apps.apple.com/jp/app/v-effect/id6763709764
  - label: Official site
    url: https://veffect.web.app/
---

**V EFFECT** is an SNS app for recording daily effort and building habits by sharing them with peers, designed around one effect: things you can't keep up alone become sustainable when someone is watching. It's built with Flutter + Firebase and live on the App Store.

Day-to-day development is driven by my co-developer, Ren. My role isn't writing the code — it's building the conditions that let Ren keep running the project independently.

It started with finding clarity together: the goal, the approach, the bottlenecks. From there, as the design → build → evaluate → learn cycle repeated, ownership of development shifted steadily to Ren. That learning is now enough of an asset inside the team that the cycle keeps turning without me.

## My role

What I actually spend my time on today falls into three situations: being the person Ren can bring a technical blocker to; handling production issues or store-review problems where speed matters; and deciding together, based on how users respond, what to build next. More than writing code myself, I spend my time protecting the ground Ren can keep building on.

- **Find Clarity**: helped set the goal, approach, and bottlenecks early on
- **Design to Learn**: the build-evaluate-learn cycle is now Ren's to run
- **Enable**: I stay close for blockers, urgent fixes, and direction calls, so the team keeps banking learning
- **Result**: the project keeps moving even when I'm not the one building

Building enough shared learning inside a team that it can keep running the cycle on its own means the project keeps moving even without me — and that's also what frees me to take on the next project without losing what was built here. V EFFECT is a working example of that.
```

---

## 4. 次世代プロジェクト

### 4-1. 位置づけ：三つ目の関わり方（仕掛け人）

taVNSでは独りで掘る研究者、V EFFECTでは伴走者。ここでは、機会そのものを自分で見つけて動かす **起業家としての関わり方** を見せる枠にしました。既存の `ec.md`（EC事業）の延長線上にありつつ、名称が「次世代プロジェクト」へと抽象化されているため、EC事業に限定せず「次に何を仕掛けているか」の器として書けるよう、2つのアングルを用意しています。

- **推奨アングル**：具体の事業名を出さず、関わり方（見つける→動かす→育てる）を主役にした抽象度の高い版。EC事業でも、それ以外の新しい挑戦でも差し替えなく使えます。
- **代替アングルB**：taVNSの研究知見を将来プロダクトへ橋渡しする、というムーンショット（`about.moonshotsBody` に既にある「研究知見をプロダクトに換える」）寄りの版。より野心を前に出したい場合はこちら、または推奨アングルと合成してください。

どちらも、具体的な事業内容・扱う商材・進捗の数字には触れていません（EC「くこ」等の固有名詞も出していません）。

### 4-2. 一覧用ワンライナー

- JA: `研究者でも伴走者でもなく、ゼロから事業を起こす仕掛け人として。今はまだ詳しく話せない、新しい挑戦を掘っています。`
- EN: `Not a researcher, not a co-pilot — here I'm the one who finds the opportunity and moves first. Still early, more to share soon.`

### 4-3. 本文ドラフト（JA・推奨アングル）

```markdown
---
title: 次世代プロジェクト
summary: 研究者でも伴走者でもなく、ゼロから事業を起こす仕掛け人として。今はまだ詳しく話せない、新しい挑戦を掘っています。
status: tbd
order: 3
tags: [事業開発, 仕掛け人]
links: []
---

taVNSでは一人で研究を掘り、V EFFECTでは伴走者としてチームを支える。ここでは、その両方とは違う関わり方をしています。機会を自分で見つけ、形にし、実際に動かす——起業家として、最初の一歩を自分で踏み出す挑戦です。

詳細はまだ公開できる段階ではありませんが、企画で終わらせず、実際に手を動かして検証を進めています。公開できる段階になったら、実際に形になったものの例と一緒に、ここで詳しく紹介します。

## 私の関わり方

- **見つける**：機会そのものを自分で発見し、最初の仮説を立てる
- **動かす**：企画で止めず、実際に手を動かして検証する
- **育てる**：taVNS・V EFFECTで培った「掘る力」「支える力」を、事業をつくる力として応用する

研究で鍛えた仮説検証のサイクルと、V EFFECTで積んだ「一人でプロダクトを最後まで運ぶ」経験。その両方を、技術だけでなく事業の土台づくりにも応用できるか——それを今、試している段階です。
```

### 4-4. 本文ドラフト（EN・推奨アングル）

```markdown
---
title: What's Next
summary: Not a researcher, not a co-pilot — here I'm the one who finds the opportunity and moves first. Still early, more to share soon.
status: tbd
order: 3
tags: [Venture building, Founder]
links: []
---

In taVNS I dig alone as a researcher; in V EFFECT I support a team as a co-pilot. This is a third mode: finding an opportunity from zero, shaping it, and moving it myself, as its founder.

It's not ready to detail publicly yet, but it's not just a plan either — I'm actively building and testing it. Once it's ready to share, I'll post it here alongside real examples of what's shipped.

## My role

- **Find it**: spot the opportunity myself and frame the first hypothesis
- **Move it**: test by building, not just planning
- **Grow it**: apply the "dig" and "enable" muscles from taVNS and V EFFECT to building a business

It's a test of whether the hypothesis-testing loop from research, and the experience of carrying a product solo through V EFFECT, can also be applied to building the foundation of a business.
```

### 4-5. 代替アングルB（研究→プロダクト橋渡し版・短縮）

具体名を伏せたまま、taVNSとの連続性をより前面に出したいなら、本文の1・2段落目をこちらに差し替え可能です。

- JA: `次に何を掘るか、常に考えています。taVNSの研究で得ている知見を、実際に人の手に届くプロダクトへと橋渡しする——そのための最初の一歩を、今まさに探しています。詳しい中身は、形になってから。`
- EN: `I'm always thinking about what to dig next. Bridging what I'm learning in taVNS research toward something that actually reaches people's hands — that first step is what I'm exploring right now. More, once it takes shape.`

---

## 5. 共通ボキャブラリー・チェックシート

新規に書き足す・調整する際は、サイト全体で既に使われている語彙と揃えると馴染みます。

- 動詞：掘る／掘り出す／掘り下げる／橋を架ける／自走する
- 関係性：相棒／伴走者／仕掛け人
- フレーズ：自走できる環境を創ります／Find Clarity → Design to Learn → Enable／DIG BUILD TEST／第一原理から考える／深く掘る。広く繋ぐ。

---

## 6. 明日決めること（判断待ちリスト）

1. **Renの表記**：今回は実名を出さず「共同開発者」「Ren」という表記に留めています。フルネーム（山崎廉）で公開して良いか、逆にもっとぼかすか。本人の希望も確認推奨。
2. **次世代プロジェクトのアングル**：推奨アングル（抽象・関わり方重視）／代替アングルB（研究連続性重視）／あるいはEC事業として具体名を出す方向、どれで進めるか。
3. **taVNSに指導教員・共同研究者名を出すか**：飯島敦彦先生・脳研究所との連携は、出せば信頼性が上がりますが本人の了承が前提です。今回のドラフトには含めていません。
4. **既存ファイルの修正**：`src/content/projects/{ja,en}/v-effect.md` の「全工程を一人で」「個人開発／Indie dev」は現状と食い違うため、新デザイン実装時に必ず更新してください（3-6章のドラフトが差し替え候補です）。
5. **EMPOWERセクションとの接続方法**：V EFFECTのキャプション（3-3章）を「What I do」側にどう埋め込むか（リンクか、インライン引用か）は、実装フェーズでのレイアウト次第で決めてください。
