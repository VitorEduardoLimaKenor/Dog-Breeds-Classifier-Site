# Vitor Kenor — Portfólio

Site de portfólio pessoal de **Vitor Eduardo de Lima Kenor**, construído em React + Vite + Tailwind. A home apresenta o autor; a aba de projetos expõe os trabalhos, sendo o **Dog Breeds Classifier** o projeto-âncora atual.

> O backend que serve o classificador (FastAPI + TensorFlow) vive em um repositório separado: **[dogbreeds-api](https://github.com/VitorEduardoLimaKenor/dogbreeds-api)**.

---

## Stack

- **React 18** + **Vite 5** + **React Router 6**
- **Tailwind CSS** + **Framer Motion** + **Lucide Icons**
- **Docker** (build estático servido por `serve`)

---

## Estrutura

```
.
├── Dockerfile              # imagem do site (multi-stage: build + serve)
├── .dockerignore
├── README.md
└── app/                    # código React/Vite
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── images/         # avatar, capas de projetos
    └── src/
        ├── App.jsx         # rotas
        ├── main.jsx
        ├── index.css
        ├── components/
        │   ├── layout/     # Header, Footer, BackgroundFX, ScrollToTop
        │   └── sections/   # ProjectCard, etc.
        ├── data/
        │   └── projects.js # fonte única dos projetos
        └── pages/
            ├── Home.jsx              # /
            ├── Projects.jsx          # /projetos
            ├── NotFound.jsx          # *
            └── projects/
                └── DogBreedsClassifier.jsx  # /projetos/dog-breeds-classifier
```

---

## Rotas

| Rota                                      | Página                 |
|-------------------------------------------|------------------------|
| `/`                                       | Home — sobre o Vitor   |
| `/projetos`                               | Listagem de projetos   |
| `/projetos/dog-breeds-classifier`         | Projeto: classificador |
| `*`                                       | 404                    |

---

## Adicionando um novo projeto

A listagem é gerada a partir de um único arquivo: [app/src/data/projects.js](app/src/data/projects.js).

1. Adicione um novo objeto ao array `projects`:

   ```js
   {
     slug: "meu-novo-projeto",
     title: "Meu Novo Projeto",
     tagline: "Resumo curto do projeto.",
     description: "Descrição mais longa…",
     cover: "/images/meu-projeto.jpg",
     tags: ["Web", "..."],
     techStack: ["React", "Node.js", "..."],
     metrics: [{ label: "Métrica", value: "X" }],
     links: {
       live: "/projetos/meu-novo-projeto",
       repo: "https://github.com/..."
     },
     featured: true,
     year: 2026
   }
   ```

2. Crie o componente da página em `app/src/pages/projects/MeuNovoProjeto.jsx`.
3. Registre a rota correspondente em `app/src/App.jsx`.

---

## Como rodar

### Local (desenvolvimento)

```bash
cd app
npm install
npm run dev          # Vite em http://localhost:3000
```

> Para a página do classificador funcionar localmente, suba o backend [dogbreeds-api](https://github.com/VitorEduardoLimaKenor/dogbreeds-api) e configure as variáveis de ambiente (abaixo).

### Produção via Docker

A partir da **raiz do repositório** (o `Dockerfile` está aqui, fora de `app/`):

```bash
# build
docker build \
  --build-arg VITE_API_URL=https://api.seu-dominio.com \
  --build-arg VITE_API_KEY=sua-chave-publica \
  -t vitor-kenor-portfolio .

# run
docker run -p 3000:3000 vitor-kenor-portfolio
```

Acesse <http://localhost:3000>.

---

## Variáveis de ambiente

Usadas em **build time** pelo Vite (precisam do prefixo `VITE_`). Crie `app/.env` para desenvolvimento:

| Nome           | Quando usar                              | Exemplo                          |
|----------------|-------------------------------------------|----------------------------------|
| `VITE_API_URL` | URL pública da `dogbreeds-api`            | `https://api.seu-dominio.com`    |
| `VITE_API_KEY` | API Key esperada pela `dogbreeds-api`     | `dog-classifier-secret-key-2026` |

Em desenvolvimento, se `VITE_API_URL` não estiver definida, o frontend cai para o caminho `/api` (proxy configurado em [app/vite.config.js](app/vite.config.js) apontando para `localhost:4004`).

---

## Deploy

Como o build gera apenas arquivos estáticos (`app/dist`), qualquer hospedagem estática funciona:

- **Docker** — usar o `Dockerfile` deste repositório (multi-stage; serve com `serve`).
- **Vercel / Netlify** — apontar para o subdir `app/`, comando `npm run build`, output `dist/`.
- **GitHub Pages** — publicar o conteúdo de `app/dist` no branch `gh-pages`.

Em qualquer caso, defina `VITE_API_URL` e `VITE_API_KEY` no ambiente do build.

---

## Licença

MIT
