import type { Lang } from '../i18n/ui';

type Bilingual = { ja: string; en: string };

export type CareerItem = {
  date: string; // 表示用 (YYYY.MM)。現在項目は 'now'
  ja: string;
  en: string;
  link?: string;
  highlight?: boolean;
};

export const career: CareerItem[] = [
  { date: '2021.03', ja: '新潟県立新発田高等学校 卒業', en: 'Graduated from Shibata High School (Niigata)' },
  { date: '2021.04', ja: '新潟大学 工学部 入学', en: 'Enrolled in the Faculty of Engineering, Niigata University' },
  {
    date: '2024.03',
    ja: '新潟大学 工学部 卒業（3年間での早期卒業 — 4年次をスキップ！）',
    en: 'Graduated from the Faculty of Engineering, Niigata University (early graduation in 3 years — skipped the 4th year!)',
    highlight: true,
  },
  {
    date: '2024.04',
    ja: '新潟大学大学院 自然科学研究科 電気情報工学専攻 人間支援感性科学プログラム 博士前期課程 入学',
    en: "Enrolled in the Master's Program, Human Sciences and Assistive Technology, Electrical and Information Engineering, Graduate School of Science and Technology, Niigata University",
    link: 'https://www.gs.niigata-u.ac.jp/~gsweb/program/eie.html',
  },
  {
    date: '2026.03',
    ja: '同 博士前期課程 修了',
    en: "Completed the Master's Program",
  },
  {
    date: '2026.03',
    ja: '保健理工学人材育成プログラム 修了',
    en: 'Completed the Human Resource Development Program in Health Sciences and Technology',
    link: 'https://www.clg.niigata-u.ac.jp/hokenriko/',
  },
  {
    date: '2026.04',
    ja: '新潟大学大学院 自然科学研究科 博士後期課程 入学（生体医工学）',
    en: 'Enrolled in the Doctoral Program, Graduate School of Science and Technology, Niigata University (biomedical engineering)',
  },
  {
    date: 'now',
    ja: '博士後期課程1年 — taVNS（経皮的耳介迷走神経刺激）を研究中',
    en: '1st-year PhD student — researching taVNS (transcutaneous auricular vagus nerve stimulation)',
    highlight: true,
  },
];

export type SkillGroup = {
  title: Bilingual;
  body: Bilingual;
  tags: string[];
};

export const skills: SkillGroup[] = [
  {
    title: { ja: 'モバイルアプリを、一人で出荷する', en: 'Shipping mobile apps, solo' },
    body: {
      ja: '企画・設計・実装・審査・運用まで全工程を一人で。習慣化SNS「V EFFECT」をApp Storeで公開・運用中。',
      en: 'The whole pipeline alone — planning, design, implementation, review and operation. Built and now running "V EFFECT", a habit-building SNS on the App Store.',
    },
    tags: ['Flutter', 'Dart', 'Firebase', 'App Store'],
  },
  {
    title: { ja: '生体信号の処理と解析', en: 'Biosignal processing & analysis' },
    body: {
      ja: 'PPG・血圧などの生体信号処理と統計解析。MATLAB歴3年（手書き＋AIエージェント）、Python歴3年（AIエージェント協働）。',
      en: 'Processing and statistical analysis of biosignals such as PPG and blood pressure. 3 years of MATLAB (by hand + AI agents), 3 years of Python (with AI agents).',
    },
    tags: ['MATLAB', 'Python', 'Signal processing', 'Statistics'],
  },
  {
    title: { ja: '低レイヤと計測システム', en: 'Low-level & measurement systems' },
    body: {
      ja: 'C言語歴5年。LabVIEWでの計測系の経験も。ハードウェアに近い層とデータの入口を理解して設計できる。',
      en: '5 years of C, plus experience with LabVIEW measurement systems. I can design with an understanding of the layers close to hardware, where data is born.',
    },
    tags: ['C', 'LabVIEW'],
  },
  {
    title: { ja: 'AI駆動開発（vibe coding）', en: 'AI-driven development (vibe coding)' },
    body: {
      ja: 'Markdownで設計を書き、AIエージェントとあらゆる言語で実装する開発スタイル。このサイト自体もその成果物。',
      en: 'Writing designs in Markdown and implementing in any language with AI agents. This very site is a product of that style.',
    },
    tags: ['Markdown-driven design', 'AI agents', 'All languages'],
  },
];

export type Moonshot = {
  title: Bilingual;
  milestones: { label: Bilingual; done?: boolean; current?: boolean }[];
};

export const moonshots: Moonshot[] = [
  {
    title: { ja: '歩く百科事典になる', en: 'Become a walking encyclopedia' },
    milestones: [
      { label: { ja: '修士号を取得', en: "Earn a Master's degree" }, done: true },
      { label: { ja: '博士号を取得（Doctorになる）', en: 'Earn a PhD (become a Doctor)' }, current: true },
      { label: { ja: '領域を横断して知を接続し続ける', en: 'Keep connecting knowledge across fields' } },
    ],
  },
  {
    title: { ja: '自分の会社を興す', en: 'Found my own companies' },
    milestones: [
      { label: { ja: '一人でプロダクトを出荷する', en: 'Ship products solo' }, done: true },
      { label: { ja: '研究知見をプロダクトに換える', en: 'Turn research insights into products' }, current: true },
      { label: { ja: '法人化・事業として育てる', en: 'Incorporate and grow it as a business' } },
    ],
  },
  {
    title: { ja: '奨学財団を設立する', en: 'Build my own scholarship foundation' },
    milestones: [
      { label: { ja: '事業を成功させる', en: 'Make the businesses succeed' } },
      { label: { ja: '次に掘る人たちへ、機会を還す', en: 'Return opportunities to the next diggers' } },
    ],
  },
];

export const hobbies: { label: Bilingual; note?: Bilingual }[] = [
  {
    label: { ja: 'ゲーム', en: 'Games' },
    note: { ja: 'Teamfight Tactics / Civilization VI / Minecraft / FPS全般', en: 'Teamfight Tactics / Civilization VI / Minecraft / many FPS titles' },
  },
  { label: { ja: '食べること', en: 'Food' } },
  { label: { ja: '筋トレ', en: 'Fitness' }, note: { ja: '自重トレーニング・ジム', en: 'Bodyweight training & gym' } },
  { label: { ja: '音楽', en: 'Music' } },
];

export function pick(b: Bilingual, lang: Lang): string {
  return b[lang];
}
