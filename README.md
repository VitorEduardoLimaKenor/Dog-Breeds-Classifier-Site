# Vitor Kenor — Portfolio Site

Site estático do portfólio de Vitor Eduardo de Lima Kenor.
É a vitrine pública: Home, Sobre, Habilidades, Portfólio e Contato.

Cada projeto listado aqui é uma aplicação **independente**, hospedada na sua
própria URL. Os cards do portfólio apenas redirecionam para essas URLs (via
`externalUrl` no [app/src/data/projects.js](app/src/data/projects.js)).

## Estrutura do repo

```
portfolio-site/
├── Dockerfile           # build + serve estático
├── .dockerignore
├── .gitignore
├── README.md
└── app/                 # aplicação React (Vite)
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── public/
    │   ├── favicon.svg
    │   └── images/
    └── src/
        ├── App.jsx, main.jsx, index.css
        ├── components/
        │   ├── layout/   (Header, Footer, SideDock, BackgroundFX, ScrollToTop)
        │   └── sections/ProjectCard.jsx
        ├── data/projects.js
        └── pages/        (Home, Projects, NotFound)
```

## Stack

- React 18 + Vite 5
- React Router 6
- Tailwind CSS 3
- Framer Motion
- Lucide Icons

## Rodar localmente

```bash
cd app
npm install
npm run dev
```

Abre em http://localhost:3002.

## Build de produção

```bash
cd app
npm run build
```

Saída em `app/dist/`. Qualquer host estático serve (Vercel, Netlify, GitHub
Pages, Cloudflare Pages, S3, etc).

## Build com Docker

A partir da raiz do repo:

```bash
docker build -t portfolio-site .
docker run -p 3002:3002 portfolio-site
```

Abre em http://localhost:3002.

## Adicionar um projeto novo

1. Abre [app/src/data/projects.js](app/src/data/projects.js).
2. Copia um item existente e ajusta os campos.
3. Garante que `externalUrl` aponta para o deploy do projeto.
4. (Opcional) Coloca uma imagem de cover em `app/public/images/` e referencia
   no campo `cover` (ex: `/images/meu-projeto.jpg`).

## Como virar um repo separado

Esta pasta foi criada dentro de outro repositório, mas é totalmente
autocontida. Para extrair em um repo novo:

```bash
# de dentro de portfolio-site/
git init
git add .
git commit -m "Initial commit"
git remote add origin <url-do-repo-novo>
git push -u origin main
```
