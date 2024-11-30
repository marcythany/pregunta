export const CONFIG = {
  APP_NAME: 'Pregunta',
  DEFAULT_LANGUAGE: 'pt-br',
  SUPPORTED_LANGUAGES: ['pt-br', 'en'],
  GAME: {
    MAX_QUESTIONS: 10,
    TIME_PER_QUESTION: 30, // seconds
    POINTS: {
      CORRECT_ANSWER: 100,
      TIME_BONUS: 10, // points per second remaining
    }
  },
  AUTH: {
    SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    MIN_PASSWORD_LENGTH: 8
  }
};
