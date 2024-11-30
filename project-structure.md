# Estrutura do Projeto Pregunta

Este documento descreve a organização do projeto Pregunta, construído com Astro.js SSR, JavaScript, React e TailwindCSS.

```
src/
├── assets/            # Recursos estáticos (imagens, fontes)
│   ├── images/
│   └── fonts/
│
├── components/        # Componentes reutilizáveis
│   ├── common/       # Componentes UI básicos usados em todo o app
│   ├── layout/       # Componentes específicos de layout
│   ├── features/     # Componentes específicos de funcionalidades
│   └── ui/          # Componentes UI compartilhados com estilização específica
│
├── constants/        # Constantes e configurações
│   ├── routes.js    # Definições de rotas
│   └── config.js    # Configuração do aplicativo
│
├── hooks/           # Hooks personalizados do React
│
├── i18n/           # Internacionalização
│   ├── translations/
│   └── config/
│
├── layouts/         # Layouts Astro
│   ├── Layout.astro # Layout principal
│   └── Auth.astro   # Layout específico de autenticação
│
├── lib/            # Configurações de bibliotecas de terceiros
│
├── middleware/     # Middleware SSR e manipuladores de rotas API
│
├── models/         # Modelos de dados e tipos
│
├── pages/          # Páginas de rotas (Astro e React)
│   ├── api/       # Endpoints da API
│   └── [...rest]  # Rotas da aplicação
│
├── stores/         # Gerenciamento de estado
│
├── styles/         # Estilos globais e configurações do Tailwind
│
└── utils/          # Funções utilitárias e auxiliares
    ├── api.js     # Utilitários da API
    ├── auth.js    # Utilitários de autenticação
    └── helpers.js # Funções auxiliares gerais
```

## Princípios Fundamentais de Organização

1. **Específico do Astro.js SSR**
   - Use arquivos `.astro` para páginas que não precisam de interatividade no lado do cliente
   - Implemente as diretivas `client:load`, `client:visible` ou `client:idle` apropriadamente
   - Utilize o middleware integrado do Astro para funcionalidade SSR
   - Mantenha rotas API em `pages/api` para operações do lado do servidor

2. **Organização de Componentes**
   - `common/`: Componentes básicos reutilizáveis
   - `features/`: Componentes específicos de funcionalidades agrupados por domínio
   - `layout/`: Componentes de layout usando Astro
   - `ui/`: Componentes UI compartilhados com estilização específica

3. **Gerenciamento de Estado**
   - Use o estado do lado do servidor do Astro quando possível
   - Implemente Context API do React para estado do lado do cliente
   - Mantenha as stores simples e focadas em domínios específicos

4. **Estilização com TailwindCSS**
   - Use classes Tailwind diretamente nos componentes
   - Crie classes utilitárias reutilizáveis em `styles/`
   - Mantenha tokens de design consistentes em `tailwind.config.mjs`
   - Implemente designs responsivos usando breakpoints do Tailwind

5. **Nomenclatura e Organização de Arquivos**
   - Páginas Astro: `page.astro`
   - Componentes React: `ComponentName.jsx`
   - Rotas API: `route.js` ou `api.js`
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
   - Implemente limites de erro adequados
   - Trate estados de carregamento apropriadamente
   - Use recursos de SEO integrados do Astro

2. **Componentes**
   - Prefira componentes `.astro` para conteúdo estático
   - Use componentes React para elementos interativos
   - Implemente tipos TypeScript adequados
   - Siga o princípio da responsabilidade única
   - Use validação adequada de props

3. **Manipulação de Dados**
   - Implemente estratégias adequadas de busca de dados
   - Use busca de dados do lado do servidor do Astro quando possível
   - Trate erros graciosamente
   - Implemente estados de carregamento adequados
   - Cache dados apropriadamente

4. **Segurança**
   - Implemente políticas CORS adequadas
   - Valide entrada do usuário
   - Use variáveis de ambiente para dados sensíveis
   - Implemente fluxos de autenticação adequados
   - Siga as melhores práticas de segurança para SSR

5. **Fluxo de Desenvolvimento**
   - Siga padrões de codificação consistentes
   - Escreva mensagens de commit significativas
   - Documente lógica complexa
   - Escreva testes para funcionalidades críticas
   - Revise mudanças de código minuciosamente

6. **Implantação**
   - Use otimização adequada de build
   - Implemente pipelines de CI/CD
   - Monitore métricas de performance
   - Use logging adequado
   - Implemente estratégias adequadas de backup
