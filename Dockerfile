# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies (frozen lockfile ensures deterministic builds)
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN pnpm build

# ---------- Stage 2: Runtime ----------
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the built assets and required files
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose port 80 for external access
EXPOSE 80

# Start the Next.js server
CMD ["pnpm", "start"]
