export const cache = {
  set(key, data, ttl = 3600) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        expires: Date.now() + (ttl * 1000)
      }));
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
    }
  },
  
  get(key) {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;
      
      if (Date.now() > item.expires) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.data;
    } catch (error) {
      console.error('Erro ao ler do cache:', error);
      return null;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do cache:', error);
    }
  },
  
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar o cache:', error);
    }
  }
};
