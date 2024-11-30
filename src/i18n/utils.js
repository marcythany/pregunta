import { defaultLang } from './ui.js';

/**
 * Extrai o código do idioma da URL
 */
export function getLanguageFromURL(pathname) {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : defaultLang;
}

/**
 * Gera uma URL localizada para o idioma especificado
 */
export function getLocalizedURL(pathname, lang) {
  const currentLang = getLanguageFromURL(pathname);
  return pathname.replace(`/${currentLang}/`, `/${lang}/`);
}

/**
 * Verifica se o idioma é válido
 */
export function isValidLanguage(lang) {
  return ['pt-br', 'en'].includes(lang);
}
