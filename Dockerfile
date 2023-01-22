# Dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./standalone/
COPY --from=builder /app/.next/static ./standalone/.next/
