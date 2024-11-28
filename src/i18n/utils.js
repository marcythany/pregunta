import { ui, defaultLang } from './config';

/**
 * Obtém o idioma da URL atual
 * @param {URL} url
 * @returns {string} código do idioma
 */
export function getLanguageFromURL(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang;
  return defaultLang;
}

/**
 * Retorna uma função de tradução para o idioma especificado
 * @param {string} lang
 * @returns {(key: string) => string}
 */
export function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key] || key;
  }
}

/**
 * Remove o prefixo de idioma da URL
 * @param {URL} url
 * @returns {string} pathname sem o prefixo de idioma
 */
export function removeLanguageFromURL(url) {
  const [, lang, ...rest] = url.pathname.split('/');
  if (lang in ui) return '/' + rest.join('/');
  return url.pathname;
}

/**
 * Verifica se uma URL é uma rota de idioma
 * @param {URL} url
 * @returns {boolean}
 */
export function isLanguageRoute(url) {
  const [, lang] = url.pathname.split('/');
  return lang in ui;
}

/**
 * Obtém todas as rotas disponíveis para um caminho
 * @param {string} path
 * @returns {string[]} array de rotas com prefixos de idioma
 */
export function getLanguageRoutes(path) {
  return Object.keys(ui).map(lang => `/${lang}${path}`);
}
