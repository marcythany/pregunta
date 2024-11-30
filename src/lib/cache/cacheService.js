class CacheService {
  static set(key, data, ttl = 3600) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        expires: Date.now() + (ttl * 1000)
      }));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
      return false;
    }
  }
  
  static get(key) {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;
      
      if (Date.now() > item.expires) {
        this.remove(key);
        return null;
      }
      
      return item.data;
    } catch (error) {
      console.error('Erro ao ler do cache:', error);
      return null;
    }
  }
  
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do cache:', error);
      return false;
    }
  }
  
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar o cache:', error);
      return false;
    }
  }
}

export default CacheService;
