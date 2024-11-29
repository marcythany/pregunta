/**
 * @typedef {Object} UserProfile
 * @property {string} id - ID único do usuário
 * @property {string} name - Nome do usuário
 * @property {string} username - Nome de usuário
 * @property {number} score - Pontuação total
 * @property {string} avatarUrl - URL do avatar
 * @property {string} favoriteColor - Cor favorita em formato hexadecimal
 * @property {'github' | 'google' | 'email'} authProvider - Provedor de autenticação
 */

/**
 * @typedef {Object} UserStats
 * @property {number} gamesPlayed - Total de jogos jogados
 * @property {number} correctAnswers - Total de respostas corretas
 * @property {number} wrongAnswers - Total de respostas erradas
 * @property {number} averageScore - Pontuação média
 * @property {number} bestScore - Melhor pontuação
 * @property {number} winStreak - Sequência atual de vitórias
 */

/**
 * Cria um novo perfil de usuário
 * @param {Object} data - Dados do usuário
 * @returns {UserProfile}
 */
export function createUserProfile(data) {
  return {
    id: data.id,
    name: data.name || '',
    username: data.username || '',
    score: data.score || 0,
    avatarUrl: data.avatarUrl || '',
    favoriteColor: data.favoriteColor || '#4F46E5',
    authProvider: data.authProvider || 'email'
  };
}

/**
 * Cria novas estatísticas de usuário
 * @returns {UserStats}
 */
export function createUserStats() {
  return {
    gamesPlayed: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    averageScore: 0,
    bestScore: 0,
    winStreak: 0
  };
}
