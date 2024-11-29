# Pregunta

![Pregunta Banner](public/banner.png)

Pregunta é uma plataforma moderna de trivia que oferece uma experiência única de aprendizado e diversão. Desenvolvida com tecnologias de ponta, a plataforma permite que jogadores testem seus conhecimentos em diversas categorias enquanto competem com outros participantes ao redor do mundo.

## Características

- 🌍 **Suporte Multi-idioma**: Disponível em Português e Inglês
- 🎨 **Design Responsivo**: Interface moderna e adaptável para todos os dispositivos
- 🌓 **Tema Claro/Escuro**: Experiência visual personalizada
- 🏆 **Sistema de Ranking**: Competição em tempo real
- 🎯 **Categorias Diversas**: Variedade de temas para todos os gostos
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida

## Tecnologias

- [Astro](https://astro.build) - Framework web com foco em performance
- [React](https://reactjs.org) - Biblioteca para interfaces interativas
- [MongoDB](https://www.mongodb.com) - Banco de dados NoSQL
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS utilitário
- [JavaScript](https://ecma-international.org/) - JavaScript

## Começando

### Pré-requisitos

- Node.js 18 ou superior
- MongoDB
- Bun (opcional, mas recomendado)

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pregunta.git
cd pregunta
```

2. Instale as dependências

```bash
# Usando Bun (recomendado)
bun install

# Ou usando npm
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações

4. Inicie o servidor de desenvolvimento

```bash
bun run dev
```

## Estrutura do Projeto

```
pregunta/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── layouts/        # Layouts base
│   ├── models/         # Modelos do MongoDB
│   ├── pages/          # Páginas e rotas
│   │   ├── api/       # Endpoints da API
│   │   ├── pt-br/     # Páginas em português
│   │   └── en/        # Páginas em inglês
│   ├── store/          # Gerenciamento de estado
│   └── utils/          # Utilitários
└── public/             # Arquivos estáticos
```

## Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Marcy Thany - [@marcythany](https://bsky.app/profile/marcypaint.bsky.social)

Link do Projeto: [https://github.com/marcythany/pregunta](https://github.com/marcythany/pregunta)
