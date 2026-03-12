# 🐕 Dog Breed Classifier - Frontend

Interface web simples e moderna para o classificador de raças de cachorros.

## 🎨 Características

- **Design responsivo** - Funciona em desktop e mobile
- **Drag & Drop** - Arraste imagens diretamente para a área de upload
- **Interface intuitiva** - Fácil de usar com feedback visual
- **Leve** - Apenas HTML, CSS e JavaScript vanilla (sem frameworks)

## 🚀 Como usar

### Com Docker (recomendado)

Na raiz do projeto:

```bash
docker-compose up --build
```

Acesse: http://localhost:3000

### Localmente

1. Certifique-se que o backend está rodando na porta 4004
2. Abra o arquivo `index.html` diretamente no navegador

Ou use um servidor HTTP simples:

```bash
# Com Python
python -m http.server 3000

# Com Node.js
npx serve -p 3000
```

## 🔧 Configuração

A URL da API está configurada no JavaScript:

```javascript
const API_URL = 'http://localhost:4004';
```

Altere conforme necessário para seu ambiente.

## 📸 Funcionalidades

1. **Sobre o Projeto** - Explicação sobre a tecnologia utilizada
2. **Como Funciona** - Passo a passo do processo
3. **Teste o Classificador** - Upload de imagem e classificação
4. **Raças Suportadas** - Lista das 16 raças que o modelo identifica

## 🐶 Raças Identificáveis

- Beagle
- Boxer
- Chihuahua
- Corgi
- Dachshund
- French Bulldog
- German Shepherd
- Golden Retriever
- Husky
- Pomeranian
- Poodle
- Pug
- Rottweiler
- Shiba Inu
- Shih Tzu
- Yorkshire Terrier
