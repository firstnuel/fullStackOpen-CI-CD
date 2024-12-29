# syntax = docker/dockerfile:1

# 1) Base image
ARG NODE_VERSION=23.3.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
# ENV NODE_ENV="production"

# 2) Build stage
FROM base AS build

# Install OS packages needed for building modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy server dependencies and install
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Build client app
WORKDIR /app/client
COPY client/ ./
RUN ls -l
RUN npm ci --include=dev

# Verify vite installation and build client
RUN npm ls vite --depth=0
RUN npm run build

# Return to root and copy server code
WORKDIR /app
COPY . .

# Remove dev dependencies
RUN npm prune --omit=dev

# 3) Final image
FROM base

WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000
CMD ["npm", "run", "start"]
