/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores Pastéis - Modo Claro
        light: {
          primary: '#A8D8EA',    // Azul pastel
          secondary: '#AA96DA',  // Roxo pastel
          accent: '#FCBAD3',     // Rosa pastel
          background: '#FFFFD2',  // Amarelo pastel claro
          text: '#444444',       // Texto escuro
          surface: '#FFFFFF',    // Superfície
        },
        // Cores Pastéis - Modo Escuro
        dark: {
          primary: '#6A8CAF',    // Azul pastel escuro
          secondary: '#8878B0',  // Roxo pastel escuro
          accent: '#CB8DA0',     // Rosa pastel escuro
          background: '#2D2D2D', // Fundo escuro
          text: '#E1E1E1',       // Texto claro
          surface: '#363636',    // Superfície
        }
      }
    }
  },
  plugins: [],
}
