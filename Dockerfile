# Stage 1 - Build App
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the app (Next.js static export)
RUN pnpm build

# Stage 2 — Serve with Caddy
FROM caddy:2-alpine

# Copy the exported static site from the builder
COPY --from=builder /app/out /usr/share/caddy 

# Copy Caddy configuration file
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]