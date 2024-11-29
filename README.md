# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# 🎯 Pregunta

Um jogo de perguntas e respostas moderno e interativo, construído com Astro e React.

## 🚀 Funcionalidades

- ✨ Interface moderna e responsiva
- 🌓 Modo claro/escuro com cores pastéis
- 🌎 Suporte a múltiplos idiomas (PT-BR/EN)
- 🎮 Modos de jogo solo e multiplayer
- 📊 Sistema de pontuação e conquistas
- 👥 Perfis de usuário personalizáveis

## 🛠️ Tecnologias

- [Astro](https://astro.build/) - Framework web moderno
- [React](https://reactjs.org/) - Biblioteca UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [MongoDB](https://www.mongodb.com/) - Banco de dados
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para MongoDB
- [Nanostores](https://github.com/nanostores/nanostores) - Gerenciamento de estado

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/marcythany/pregunta.git

# Entre no diretório
cd pregunta

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração

1. Copie o arquivo `.env.example` para `.env.local`
2. Preencha as variáveis de ambiente necessárias:
   - Configurações do banco de dados
   - Chaves de autenticação
   - Credenciais OAuth (opcional)

## 🌍 Internacionalização

O projeto suporta dois idiomas:

- 🇧🇷 Português (Brasil)
- 🇺🇸 English

Para adicionar ou modificar traduções, edite os arquivos em `src/i18n/`.

## 🎨 Temas

O projeto inclui dois temas com cores pastéis:

### Modo Claro

- Primary: #A8D8EA (Azul pastel)
- Secondary: #AA96DA (Roxo pastel)
- Accent: #FCBAD3 (Rosa pastel)

### Modo Escuro

- Primary: #6A8CAF (Azul pastel escuro)
- Secondary: #8878B0 (Roxo pastel escuro)
- Accent: #CB8DA0 (Rosa pastel escuro)

## 📁 Estrutura do Projeto

```
src/
├── actions/        # Server Actions
├── assets/         # Imagens e recursos
├── components/     # Componentes React/Astro
│   ├── game/      # Componentes do jogo
│   └── ui/        # Componentes de interface
├── i18n/          # Arquivos de tradução
├── layouts/       # Layouts Astro
└── pages/         # Páginas da aplicação
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- [@marcythany](https://github.com/marcythany) - Ideia e desenvolvimento inicial

## 🙏 Agradecimentos

- Astro.build pela excelente documentação
- Comunidade open source por todas as ferramentas utilizadas
