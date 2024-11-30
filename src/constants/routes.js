export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  CATEGORIES: '/categories',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile'
  },
  QUESTIONS: {
    CREATE: '/questions/create',
    LIST: '/questions'
  }
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  },
  QUESTIONS: {
    CREATE: '/api/questions',
    LIST: '/api/questions',
    GET: (id) => `/api/questions/${id}`
  }
};
