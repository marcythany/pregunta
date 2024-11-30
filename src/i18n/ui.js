export const languages = {
  'pt-br': 'Português',
  'en': 'English'
};

export const defaultLang = 'pt-br';

export const ui = {
  'pt-br': {
    nav: {
      home: 'Início',
      about: 'Sobre',
      login: 'Entrar',
      register: 'Registrar',
      play: 'Jogar',
      profile: 'Perfil',
      signup: 'Cadastrar',
      logout: 'Sair',
      ranking: 'Ranking'
    },
    welcome: {
      title: 'Bem-vindo ao Pregunta',
      description: 'Uma plataforma moderna de trivia que oferece uma experiência única de aprendizado e diversão.'
    },
    categories: {
      title: 'Categorias'
    },
    points: {
      title: 'Pontos',
      count: (count) => `${count} ${count === 1 ? 'ponto' : 'pontos'}`
    },
    ranking: {
      title: 'Ranking',
      position: (pos) => `${pos}º lugar`
    }
  },
  'en': {
    nav: {
      home: 'Home',
      about: 'About',
      login: 'Login',
      register: 'Register',
      play: 'Play',
      profile: 'Profile',
      signup: 'Sign Up',
      logout: 'Logout',
      ranking: 'Ranking'
    },
    welcome: {
      title: 'Welcome to Pregunta',
      description: 'A modern trivia platform that offers a unique learning and fun experience.'
    },
    categories: {
      title: 'Categories'
    },
    points: {
      title: 'Points',
      count: (count) => `${count} ${count === 1 ? 'point' : 'points'}`
    },
    ranking: {
      title: 'Ranking',
      position: (pos) => `${pos}${getOrdinalSuffix(pos)} place`
    }
  }
};

function getOrdinalSuffix(number) {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}
