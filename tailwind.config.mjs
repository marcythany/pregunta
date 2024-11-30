/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tema claro
        light: {
          background: '#f1eefb', // dull-lavender-50
          surface: '#e5e0f8',
          primary: '#8152cf', // dull-lavender-600
          secondary: '#9a76dc', // dull-lavender-500
          accent: '#6b3ebb', // dull-lavender-700
          text: {
            primary: '#2a1757', // dull-lavender-950
            secondary: '#5a319d', // dull-lavender-800
            accent: '#8152cf', // dull-lavender-600
          }
        },
        // Tema escuro
        dark: {
          background: '#2a1757', // dull-lavender-950
          surface: '#452679', // dull-lavender-900
          primary: '#9a76dc', // dull-lavender-500
          secondary: '#b498e8', // dull-lavender-400
          accent: '#d2c7f2', // dull-lavender-300
          text: {
            primary: '#f8f7fe', // dull-lavender-50
            secondary: '#e5e0f8', // dull-lavender-200
            accent: '#b498e8', // dull-lavender-400
          }
        },
        // Cores de estado com base na paleta dull-lavender
        success: {
          light: '#6b3ebb', // dull-lavender-700
          dark: '#b498e8', // dull-lavender-400
        },
        error: {
          light: '#8152cf', // dull-lavender-600
          dark: '#d2c7f2', // dull-lavender-300
        },
        warning: {
          light: '#5a319d', // dull-lavender-800
          dark: '#e5e0f8', // dull-lavender-200
        },
        info: {
          light: '#9a76dc', // dull-lavender-500
          dark: '#f1eefb', // dull-lavender-100
        },
        // Paleta completa dull-lavender para uso flexível
        'dull-lavender': {
          '50': '#f8f7fe',
          '100': '#f1eefb',
          '200': '#e5e0f8',
          '300': '#d2c7f2',
          '400': '#b498e8',
          '500': '#9a76dc',
          '600': '#8152cf',
          '700': '#6b3ebb',
          '800': '#5a319d',
          '900': '#452679',
          '950': '#2a1757',
        },
      },
      fontFamily: {
        'display': ['Fredoka', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      // Sombras suaves
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      // Bordas arredondadas
      borderRadius: {
        'sm': '0.375rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
      },
      // Animações personalizadas
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
