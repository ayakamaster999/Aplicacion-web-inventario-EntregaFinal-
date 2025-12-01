# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# Install only production dependencies (omit devDependencies added for CI/testing)
# Use the modern flag `--omit=dev` which is preferred over the deprecated `--production` config
RUN npm install --omit=dev --no-audit --no-fund
COPY server.js ./
# Mantener data.json fuera del contenedor con volumen en docker-compose
EXPOSE 3000
CMD ["node", "server.js"]
