/**
 * サイト全文のコピーの型。
 * 英語版は copy.en.ts。将来の日本語版は同じ型で copy.ja.ts を作れば差し替えられる。
 */

export type NavSub = { id: string; label: string };
export type NavGroup = {
  id: string;         // セクショングループ（data-group と一致）
  label: string;      // ナビ表示名
  target: string;     // クリック時のジャンプ先セクション id
  subs?: NavSub[];    // サブ項目（各 id はセクション id と一致）
};

export type CareerPoint = { year: string; label: string };
export type StylePoint = { title: string; body: string };
export type Hobby = { label: string; note?: string };

export type SkillGroup = { title: string; items: string[] };

/** MOONSHOT の 3 本柱。visual は下に置く説明図（src/components/visuals/）を選ぶ */
export type Pillar = { label: string; visual: 'choice' | 'action' | 'continuity' };

/** 本文の下に並べる図（src/components/visuals/）。1 プロジェクト内では同じ縦横比のものを並べる */
export type PlateVisual = 'tavns-why' | 'tavns-rig' | 'tavns-panel' | 'veffect-app' | 'veffect-growth';
/** weight は帯の中での横幅比（既定 1）。情報量の多い図に多めに割り当てる */
export type Plate = { visual: PlateVisual; title: string; caption: string; weight?: number };

export type Project = {
  id: string;
  name: string;
  tagline: string;
  overview: string[];         // 段落。{appstore} {web} のようなプレースホルダーはリンクに置換される
  role: string[];
  footnote?: string;
  links?: { key: string; label: string; url: string }[];
  plates: Plate[];            // 本文の下に並べる説明図
};

export type Milestone = { label: string; done?: boolean };
export type Goal = { title: string; milestones: Milestone[] };

export type Copy = {
  meta: { title: string; description: string };
  nav: NavGroup[];
  hero: { lines: string[]; tagline: string; social: { label: string; key: 'linkedin' | 'github' | 'researchmap' }[] };
  who: {
    name: string;
    triad: { verb: string; noun: string }[];
    tabs: { career: string; style: string; hobbies: string };
    career: CareerPoint[];
    style: { lead: string; points: StylePoint[] };
    hobbies: Hobby[];
  };
  how: { title: string; lead: string[]; body: string[]; close: string[] };
  what: {
    title: string;
    lead: string;
    tabs: { clients: string; recruiters: string };
    clients: { headline: string; body: string; giveLabel: string; gives: string[] };
    recruiters: { steps: { title: string; body: string }[] };
    caseStudy: { prefix: string; label: string; target: string };
  };
  skills: { knowledgeTitle: string; knowledge: string[]; toolsTitle: string; tools: SkillGroup[] };
  projects: Project[];
  goals: { kicker: string; headline: string; pillars: Pillar[] };
  milestones: { goals: Goal[] };
  contact: {
    title: string;
    tabs: { clients: string; recruiters: string };
    form: {
      name: string; contact: string; contactHint: string; source: string; dream: string;
      submit: string; sending: string; done: string; error: string;
    };
    letter: {
      opening: string[];
      facts: { label: string; values: string[] }[];
      closing: string[];
      signature: string;
      emailLabel: string;
    };
  };
  footer: { copyright: string };
  a11y: { skip: string; nav: string; menu: string; close: string; done: string; todo: string };
};
