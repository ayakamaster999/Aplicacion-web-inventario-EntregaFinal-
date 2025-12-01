# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
# Copy only package.json here to avoid pulling devDependencies that may be present
# in a committed package-lock.json used by the repo. CI/dev deps (jest/supertest)
# must not be installed into the production image.
COPY package.json ./
# Remove devDependencies from package.json inside the build image before installing
# This avoids npm attempting to resolve devDependencies (e.g. jest/supertest) during image build
RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json'));delete p.devDependencies;fs.writeFileSync('package.json',JSON.stringify(p));"
# Install only production deps
RUN npm install --no-audit --no-fund
COPY server.js ./
# Mantener data.json fuera del contenedor con volumen en docker-compose
EXPOSE 3000
CMD ["node", "server.js"]
