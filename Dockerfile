# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência e o schema do Prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instala todas as dependências (incluindo as de dev)
RUN npm install

# Copia o resto do código
COPY . .

# Gera o cliente do Prisma e compila o NestJS
RUN npx prisma generate
RUN npm run build

# Estágio 2: Produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário do estágio de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expõe a porta da API
EXPOSE 3000

# Script de inicialização: Roda as migrações pendentes e sobe a API
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
