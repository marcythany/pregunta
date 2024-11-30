/**
 * @typedef {Object} UserProfile
 * @property {string} id - ID único do usuário
 * @property {string} name - Nome do usuário
 * @property {string} email - Email do usuário
 * @property {string} password - Senha criptografada do usuário
 * @property {string} username - Nome de usuário
 * @property {number} points - Pontuação total
 * @property {string} avatarUrl - URL do avatar
 * @property {string} favoriteColor - Cor favorita em formato hexadecimal
 * @property {'github' | 'google' | 'email'} authProvider - Provedor de autenticação
 * @property {Object} permissions - Permissões do usuário
 * @property {string} refreshToken - Token de atualização
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
 * @typedef {Object} UserPermission
 * @property {boolean} hasPermission - Se tem a permissão
 * @property {number} pointsNeeded - Pontos necessários para a permissão
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
    email: data.email || '',
    password: data.password || '',
    username: data.username || '',
    points: data.points || 0,
    avatarUrl: data.avatarUrl || '',
    favoriteColor: data.favoriteColor || '#4F46E5',
    authProvider: data.authProvider || 'email',
    permissions: data.permissions || getDefaultPermissions(),
    refreshToken: data.refreshToken || null
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

/**
 * Retorna as permissões padrão para um novo usuário
 * @returns {Object.<string, UserPermission>}
 */
export function getDefaultPermissions() {
  return {
    CREATE_QUESTION: {
      hasPermission: false,
      pointsNeeded: 100
    },
    MODERATE_QUESTIONS: {
      hasPermission: false,
      pointsNeeded: 1000
    },
    CREATE_CATEGORY: {
      hasPermission: false,
      pointsNeeded: 500
    },
    ACCESS_BETA: {
      hasPermission: false,
      pointsNeeded: 50
    }
  };
}
