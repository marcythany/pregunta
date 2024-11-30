/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores principais do tema claro
        light: {
          background: '#F5F7FF', // Azul bem claro e suave
          surface: '#FFFFFF',
          primary: '#6366F1', // Índigo acessível
          secondary: '#8B5CF6', // Roxo acessível
          accent: '#F59E0B', // Âmbar acessível
          text: {
            primary: '#1F2937', // Cinza escuro para texto principal
            secondary: '#4B5563', // Cinza médio para texto secundário
            accent: '#6366F1', // Índigo para links e destaques
          }
        },
        // Cores principais do tema escuro
        dark: {
          background: '#161B22', // Azul escuro suave
          surface: '#1F2937',
          primary: '#818CF8', // Índigo claro acessível
          'primary-bg': '#4338CA', // Índigo mais escuro para background de botões
          'primary-hover': '#3730A3', // Ainda mais escuro para hover
          secondary: '#A78BFA', // Roxo claro acessível
          accent: '#FCD34D', // Âmbar claro acessível
          text: {
            primary: '#F3F4F6', // Cinza bem claro para texto principal
            secondary: '#D1D5DB', // Cinza claro para texto secundário
            accent: '#818CF8', // Índigo claro para links e destaques
          }
        },
        // Cores de estado
        success: {
          light: '#059669', // Verde esmeralda acessível
          dark: '#34D399', // Verde esmeralda claro acessível
        },
        error: {
          light: '#DC2626', // Vermelho acessível
          dark: '#F87171', // Vermelho claro acessível
        },
        warning: {
          light: '#D97706', // Âmbar acessível
          dark: '#FBBF24', // Âmbar claro acessível
        },
        info: {
          light: '#2563EB', // Azul acessível
          dark: '#60A5FA', // Azul claro acessível
        },
        // Cores de destaque para elementos interativos
        accent: {
          yellow: '#FFD93D',
          orange: '#FF8400',
          purple: '#9B6B9E',
          green: '#4CAF50',
          pink: '#FF69B4'
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
