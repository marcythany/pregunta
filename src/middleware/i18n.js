import { defaultLang } from '../i18n/ui.js';
import { getLanguageFromURL, isValidLanguage } from '../i18n/utils.js';

export const i18nMiddleware = (context, next) => {
  const pathname = context.url.pathname;
  
  // Se estiver na raiz, redireciona para o idioma padrão
  if (pathname === '/') {
    return context.redirect(`/${defaultLang}`);
  }

  // Obtém o idioma da URL
  const lang = getLanguageFromURL(pathname);
  
  // Se o idioma não for válido, redireciona para o idioma padrão
  if (!isValidLanguage(lang)) {
    return context.redirect(`/${defaultLang}${pathname}`);
  }

  return next();
};
