# Pregunta Project Structure

This document outlines the organization of the Pregunta project, following best practices for Astro.js with JavaScript, React, and TailwindCSS.

```
src/
├── components/           # Reusable components
│   ├── common/          # Basic UI components used across the app
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Avatar.jsx
│   │   └── ...
│   ├── layout/          # Layout-specific components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   ├── features/        # Feature-specific components
│   │   ├── auth/        # Authentication related components
│   │   │   ├── LoginForm.jsx
│   │   │   └── AuthModal.jsx
│   │   ├── game/        # Game-specific components
│   │   │   ├── GameBoard.jsx
│   │   │   └── ScoreCard.jsx
│   │   └── questions/   # Question-related components
│   │       ├── QuestionCard.jsx
│   │       └── QuestionList.jsx
│   └── ui/             # Shared UI components with specific styling
│       ├── icons/      # SVG icons and icon components
│       ├── forms/      # Form-specific components
│       └── modals/     # Modal components
│
├── layouts/            # Page layouts
│   ├── Layout.astro    # Main layout
│   ├── GameLayout.astro # Game-specific layout
│   └── AuthLayout.astro # Auth pages layout
│
├── pages/              # Route pages
│   ├── index.astro
│   ├── game/
│   ├── auth/
│   └── categories/
│
├── stores/             # State management
│   ├── gameStore.js
│   └── authStore.js
│
├── utils/              # Utility functions and helpers
│   ├── api.js         # API utilities
│   ├── auth.js        # Authentication utilities
│   └── helpers.js     # General helper functions
│
├── i18n/              # Internationalization
│   ├── translations/  # Translation files
│   └── useTranslations.js
│
├── constants/         # Constants and configuration
│   ├── routes.js     # Route definitions
│   └── config.js     # App configuration
│
└── assets/           # Static assets
    ├── images/
    └── fonts/
```

## Key Organization Principles

1. **Component Organization**
   - `common/`: Basic reusable components
   - `features/`: Feature-specific components grouped by domain
   - `layout/`: Layout components using Astro
   - `ui/`: Shared UI components with specific styling

2. **State Management**
   - Keep stores simple and focused
   - Use React's Context API for component-level state
   - Store files should be JavaScript files

3. **Styling with TailwindCSS**
   - Use Tailwind classes directly in components
   - Avoid CSS modules or separate CSS files
   - Create reusable Tailwind component classes in components when needed

4. **File Naming Conventions**
   - React components: PascalCase (e.g., `Button.jsx`)
   - Astro components: PascalCase (e.g., `Header.astro`)
   - Utility files: camelCase (e.g., `helpers.js`)
   - Test files: ComponentName.test.jsx

5. **Import Organization**
   - Group imports in the following order:
     1. React/Framework imports
     2. Third-party libraries
     3. Components
     4. Utilities/Helpers
     5. Assets

6. **Code Splitting**
   - Use dynamic imports for large features
   - Leverage Astro's built-in code splitting
   - Keep components focused and single-responsibility

7. **Performance Considerations**
   - Lazy load components when possible
   - Use client:load only when necessary
   - Optimize images using Astro's image components

## Best Practices

1. **Components**
   - Keep components small and focused
   - Use composition over inheritance
   - Implement proper prop validation
   - Use meaningful component and prop names

2. **JavaScript**
   - Use modern JavaScript features
   - Implement proper error handling
   - Use async/await for asynchronous operations
   - Keep business logic in separate utility files

3. **TailwindCSS**
   - Use @apply for complex, repeated styles
   - Maintain consistent spacing and color usage
   - Utilize Tailwind's configuration for custom values
   - Keep responsive designs mobile-first

4. **Performance**
   - Implement proper loading states
   - Use proper caching strategies
   - Optimize assets and bundle sizes
   - Monitor and optimize component re-renders
