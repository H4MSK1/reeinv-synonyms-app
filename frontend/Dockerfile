# Base stage
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@latest
COPY . /opt/frontend
WORKDIR /opt/frontend

# Dependencies stage
FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Executable stage
FROM base
COPY --from=deps /opt/frontend/node_modules /opt/frontend/node_modules

EXPOSE 5173
CMD ["pnpm", "dev"]
