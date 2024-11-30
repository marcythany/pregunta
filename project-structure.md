# Estrutura do Projeto Pregunta

Este documento descreve a organização do projeto Pregunta, construído com Astro.js SSR, JavaScript, React e TailwindCSS.

```
src/
├── assets/            # Recursos estáticos (imagens, fontes)
│   ├── images/
│   └── fonts/
│
├── components/        # Componentes reutilizáveis
│   ├── features/     # Componentes específicos de funcionalidades
│   │   ├── auth/     # Componentes de autenticação
│   │   ├── categories/ # Componentes de categorias
│   │   ├── game/     # Componentes do jogo
│   │   ├── preferences/ # Componentes de preferências (idioma, tema)
│   │   ├── questions/ # Componentes de perguntas
│   │   ├── ranking/  # Componentes de ranking
│   │   └── welcome/  # Componentes de boas-vindas
│   ├── layout/       # Componentes específicos de layout
│   └── ui/           # Componentes UI compartilhados
│       ├── base/     # Componentes base (Button, Card, etc)
│       └── modals/   # Componentes de modal
│
├── constants/        # Constantes e configurações
│   ├── routes.js    # Definições de rotas
│   └── config.js    # Configuração do aplicativo
│
├── hooks/           # Hooks personalizados do React
│
├── i18n/           # Internacionalização
│   ├── ui.js      # Traduções da interface
│   ├── utils.js   # Utilitários de i18n
│   └── useTranslations.js # Hook de traduções
│
├── layouts/         # Layouts Astro
│   └── Layout.astro # Layout principal
│
├── lib/            # Serviços e configurações
│   ├── api/        # Serviço de API
│   ├── auth/       # Serviço de autenticação
│   ├── cache/      # Serviço de cache
│   ├── db/         # Serviço de banco de dados
│   └── services/   # Outros serviços
│
├── middleware/     # Middleware SSR e manipuladores de rotas API
│   ├── auth.js    # Middleware de autenticação
│   └── i18n.js    # Middleware de internacionalização
│
├── models/         # Modelos de dados e tipos
│
├── pages/          # Páginas e rotas
│   ├── [lang]/    # Rotas com suporte a idiomas
│   ├── api/       # Endpoints da API
│   │   ├── auth/  # Endpoints de autenticação
│   │   ├── questions/ # Endpoints de perguntas
│   │   └── user/  # Endpoints de usuário
│   ├── login/     # Páginas de login
│   └── register/  # Páginas de registro
│
├── stores/         # Gerenciamento de estado
│   └── authStore.js # Store de autenticação
│
├── styles/         # Estilos globais
│
└── utils/          # Funções utilitárias
    └── permissions.js # Utilitários de permissões

## Princípios Fundamentais de Organização

1. **Específico do Astro.js SSR**
   - Use arquivos `.astro` para páginas que não precisam de interatividade no lado do cliente
   - Implemente as diretivas `client:load`, `client:visible` ou `client:idle` apropriadamente
   - Utilize o middleware integrado do Astro para funcionalidade SSR
   - Mantenha rotas API em `pages/api` para operações do lado do servidor

2. **Organização de Componentes**
   - `features/`: Componentes específicos de funcionalidades (Auth, Questions, Game) agrupados por domínio
   - `layout/`: Componentes de layout (Header) usando Astro e React quando necessário
   - `ui/`: Componentes UI compartilhados com estilização específica do Tailwind
     - `base/`: Componentes base reutilizáveis (Button, Input, Card)
     - `modals/`: Componentes de modal e diálogo

3. **Gerenciamento de Estado e Serviços**
   - Serviços centralizados em `lib/` para funcionalidades principais:
     - `ApiService`: Gerenciamento de chamadas HTTP
     - `AuthService`: Autenticação e autorização
     - `DbService`: Conexão com banco de dados
     - `CacheService`: Gerenciamento de cache
   - Stores para estado global usando Nanostores
   - Middleware para funcionalidades SSR e API

4. **Estilização com TailwindCSS**
   - Use classes Tailwind diretamente nos componentes
   - Crie classes utilitárias reutilizáveis em `styles/`
   - Mantenha tokens de design consistentes em `tailwind.config.mjs`
   - Implemente designs responsivos usando breakpoints do Tailwind

5. **Nomenclatura e Organização de Arquivos**
   - Páginas Astro: `page.astro`
   - Componentes React: `ComponentName.jsx`
   - Rotas API: `route.js` ou `api.js`
   - Stores: `storeName.js`
   - Utilitários: `camelCase.js`
   - Testes: `ComponentName.test.jsx`

6. **Otimização de Performance**
   - Implemente estratégias adequadas de hidratação parcial
   - Use otimização de imagens do Astro
   - Implemente transições de visualização
   - Utilize estratégias adequadas de cache
   - Otimize tamanhos de bundle com code splitting

## Melhores Práticas

1. **Astro.js SSR**
   - Mantenha páginas o mais estáticas possível
   - Use renderização do lado do servidor para conteúdo dinâmico
   - Implemente middleware para autenticação e i18n
   - Utilize rotas dinâmicas com [lang] para internacionalização
   - Use recursos de SEO integrados do Astro

2. **Arquitetura de Serviços**
   - Use `DbService` para todas as conexões com MongoDB
   - Utilize `ApiService` para chamadas HTTP padronizadas
   - Implemente `AuthService` para gerenciamento de autenticação
   - Use `CacheService` para otimização de performance
   - Mantenha serviços como singletons para melhor gerenciamento de recursos

3. **Componentes e UI**
   - Organize componentes por domínio em `features/`
   - Mantenha componentes base reutilizáveis em `ui/base/`
   - Use componentes modais de `ui/modals/` para diálogos
   - Implemente internacionalização usando o hook `useTranslations`
   - Siga o princípio da responsabilidade única

4. **Autenticação e Autorização**
   - Use JWT para autenticação de usuários
   - Implemente refresh tokens para sessões longas
   - Verifique permissões usando middleware de autenticação
   - Suporte múltiplos provedores de autenticação
   - Mantenha dados sensíveis em variáveis de ambiente

5. **Internacionalização (i18n)**
   - Use rotas dinâmicas [lang] para suporte multi-idioma
   - Mantenha traduções centralizadas em `i18n/ui.js`
   - Implemente detecção automática de idioma
   - Use o hook `useTranslations` para acesso às traduções
   - Suporte fallback para traduções ausentes

6. **Performance e Otimização**
   - Implemente caching adequado com `CacheService`
   - Use lazy loading para componentes pesados
   - Otimize carregamento de imagens
   - Minimize requisições ao banco de dados
   - Implemente estratégias de cache no cliente e servidor
