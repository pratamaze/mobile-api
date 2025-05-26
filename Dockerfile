FROM oven/bun:1.2

WORKDIR /app

# Install OpenSSL dan libssl-dev
RUN apt-get update && apt-get install -y openssl libssl-dev

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "src/index.ts"]
