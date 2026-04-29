FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all necessary files
COPY . .

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 8080

# Run migrations then start app
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]