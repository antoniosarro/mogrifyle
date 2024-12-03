# Base image with Node and pnpm
FROM node:23.2.0-alpine AS base
RUN npm i -g pnpm@9.14.2

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm fetch --frozen-lockfile && \
    pnpm install --frozen-lockfile --prod --no-optional

# Build the application
FROM base AS build
WORKDIR /app

# Install all dependencies including devDependencies
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm fetch --frozen-lockfile && \
    pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Production image
FROM base
WORKDIR /app

# Copy only the production node_modules directly from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server.js ./server.js

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]