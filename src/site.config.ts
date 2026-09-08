// サイト全体の設定。公開前にここだけ確認すればよいように一箇所へ集約。

// ※アクセスキーはクライアント公開前提の仕様（メールアドレス自体は公開されない）。
export const WEB3FORMS_ACCESS_KEY = '36a5dd56-23cf-4399-8b5b-62a88a3d7dc0';

export const SOCIAL = {
  github: 'https://github.com/YusukeKatahara',
  linkedin: 'https://www.linkedin.com/in/yusuke-katahara-8979b9400/',
  researchmap: 'https://researchmap.jp/y-katahara',
} as const;

// メールアドレスは bot 収集対策として分割して埋め込み、ブラウザ側で結合して表示する。
export const EMAIL_PARTS = { user: 'y.katahara.academia', domain: 'gmail.com' } as const;

export const SITE_URL = 'https://bigdogdig.com';
