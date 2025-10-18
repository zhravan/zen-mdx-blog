# Stage 1 - Build App
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

# Stage 2 — Serve with Caddy

FROM caddy:2-alpine

# Copy the exported static site from the builder
COPY --from=builder /app/out /usr/share/caddy 

# Copy Caddy configuration file
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]