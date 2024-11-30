import { addToast } from '@ui/modals/ToastManager';
import CacheService from '../cache/cacheService';

const API_URL = import.meta.env.PUBLIC_API_URL || '';
const DEFAULT_CACHE_TTL = 300; // 5 minutos

class ApiService {
  static async fetch(endpoint, options = {}) {
    const { useCache = false, cacheTTL = DEFAULT_CACHE_TTL, ...fetchOptions } = options;
    
    // Se cache está habilitado e é um GET, tenta buscar do cache primeiro
    if (useCache && (!options.method || options.method === 'GET')) {
      const cachedData = CacheService.get(endpoint);
      if (cachedData) return cachedData;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          ...fetchOptions.headers
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      // Se cache está habilitado e é um GET, salva no cache
      if (useCache && (!options.method || options.method === 'GET')) {
        CacheService.set(endpoint, data, cacheTTL);
      }
      
      return data;
    } catch (error) {
      addToast(error.message, 'error');
      throw error;
    }
  }

  static get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  }

  static post(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  static put(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  static delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  }

  static clearCache() {
    CacheService.clear();
  }
}

export default ApiService;
