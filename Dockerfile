FROM oven/bun:1.2

WORKDIR /app

# Install OpenSSL (untuk Prisma)
RUN apt-get update && apt-get install -y openssl

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "src/index.ts"]
