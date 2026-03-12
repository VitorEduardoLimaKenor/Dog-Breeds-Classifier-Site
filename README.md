# Dog Breeds Classifier

Classificador de raças de cães usando Deep Learning. Projeto de Visão Computacional criado para a finalização do Bootcamp de Aprendizado de Máquina do LAMIA.

O modelo utiliza **Transfer Learning** com a arquitetura **InceptionV3**, alcançando **95% de precisão** em teste, sendo capaz de identificar **16 raças** de cães.

## Tecnologias

- **Python** — linguagem principal
- **TensorFlow / Keras** — treinamento e inferência do modelo
- **InceptionV3** — arquitetura base (Transfer Learning)
- **FastAPI** — API REST do backend
- **React + Vite + Tailwind CSS** — frontend
- **Nginx** — servidor web e reverse proxy
- **Docker / Docker Compose** — containerização

## Como rodar com Docker

### 1. Configurar a chave de API

Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base):

```bash
cp .env.example .env
```

Edite o `.env` e defina uma chave secreta:

```
API_KEY=sua-chave-secreta-aqui
```

### 2. Subir os containers

```bash
docker compose up --build
```

### 3. Acessar

- **Site**: http://localhost:3000

Pronto. O frontend já se comunica com o backend internamente via Nginx. A API não fica exposta externamente.

## Raças suportadas

Beagle, Boxer, Chihuahua, Corgi, Dachshund, French Bulldog, German Shepherd, Golden Retriever, Husky, Pomeranian, Poodle, Pug, Rottweiler, Shiba Inu, Shih Tzu, Yorkshire Terrier.
