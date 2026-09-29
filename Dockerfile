FROM node:20-alpine

WORKDIR /app

# Install build dependencies if needed
RUN apk add --no-cache python3 make g++

# Copy package descriptors
COPY package*.json ./

# Install dependencies including ts-node for execution
RUN npm install

# Copy application source
COPY . .

# Ensure upload/cache directories exist
RUN mkdir -p public/cache public/product_images public/shop_images

# Railway dynamically injects PORT (default 3000)
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
