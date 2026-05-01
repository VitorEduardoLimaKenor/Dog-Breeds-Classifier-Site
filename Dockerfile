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

RUN npm run build

# ============================================================
# Runtime stage — servidor estático leve
# ============================================================
FROM node:20-alpine

RUN npm install -g serve

COPY --from=build /build/dist /app

EXPOSE 3002

CMD ["serve", "-s", "/app", "-l", "3002"]
