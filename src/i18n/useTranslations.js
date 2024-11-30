import { ui, defaultLang } from './ui.js';

export function useTranslations(lang = defaultLang) {
  return function t(key) {
    return ui[lang]?.[key] || ui[defaultLang][key];
  }
}

export function getLanguageFromURL(pathname) {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : defaultLang;
}

export function getLocalizedURL(pathname, lang) {
  const currentLang = getLanguageFromURL(pathname);
  return pathname.replace(`/${currentLang}/`, `/${lang}/`);
}
