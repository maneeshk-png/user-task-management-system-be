# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Expose NestJS port
EXPOSE 3000

# Run NestJS in watch mode
CMD ["npm", "run", "start:dev"]
