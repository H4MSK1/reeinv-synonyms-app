# Base stage
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@latest
COPY . /opt/backend
WORKDIR /opt/backend

# Dependencies stage
FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Executable stage
FROM base
COPY --from=deps /opt/backend/node_modules /opt/backend/node_modules
ENV NODE_ENV=dev
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000
CMD ["pnpm", "dev"]
