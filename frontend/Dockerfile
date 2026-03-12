# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Production stage
FROM nginx:alpine

# Copia os arquivos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração do nginx como template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Script de inicialização que injeta a API_KEY no config
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expõe a porta 80
EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
