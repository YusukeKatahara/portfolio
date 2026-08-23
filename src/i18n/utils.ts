import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** そのままの相対パス（ja基準）を、指定言語のパスへ変換する */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? `/en${clean === '/' ? '/' : clean}` : clean;
}

/** 現在のパスを、もう一方の言語の対応パスへ変換する */
export function switchLangPath(pathname: string, target: Lang): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return target === 'en' ? `/en${stripped === '/' ? '/' : stripped}` : stripped;
}
