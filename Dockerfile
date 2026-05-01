# ============================================================
# Build stage
# ============================================================
FROM node:20-alpine AS build

WORKDIR /build

# Instala deps primeiro para aproveitar o cache do Docker
COPY app/package.json app/package-lock.json* ./
RUN npm install

# Copia o restante do código do app
COPY app/ ./

# Variáveis de build (Vite injeta no bundle)
ARG VITE_API_KEY
ARG VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ============================================================
# Runtime stage — servidor estático leve
# ============================================================
FROM node:20-alpine

RUN npm install -g serve

COPY --from=build /build/dist /app

EXPOSE 3001

CMD ["serve", "-s", "/app", "-l", "3001"]
