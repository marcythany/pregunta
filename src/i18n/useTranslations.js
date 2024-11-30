import { ui, defaultLang } from './ui.js';

export function useTranslations(lang = defaultLang) {
  function t(key, params = {}) {
    // Divide a chave por pontos para acessar objetos aninhados
    const keys = key.split('.');
    let value = ui[lang];

    // Navega através dos objetos aninhados
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Se não encontrar no idioma atual, tenta no idioma padrão
        value = ui[defaultLang];
        for (const defaultK of keys) {
          value = value?.[defaultK];
        }
        break;
      }
    }

    // Se for uma função (para strings com parâmetros), executa ela
    if (typeof value === 'function') {
      return value(params);
    }

    // Retorna o valor encontrado ou a chave se não encontrar nada
    return value || key;
  }

  return t;
}
