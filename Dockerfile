# ================================
# Stage 1: Build Angular Application
# ================================
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files để tận dụng Docker cache
COPY package*.json ./

# Install all dependencies (cần dev dependencies để build Angular)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build ứng dụng cho production (cho phép bundle size lớn)
RUN npm run build -- --configuration=production --extract-licenses=false --source-map=false

# ================================
# Stage 2: Serve với Nginx
# ================================
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy built application từ stage build
COPY --from=build /app/dist/ecommerce-app-client/browser /usr/share/nginx/html

# Copy custom nginx configuration (tùy chọn)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make entrypoint executable
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4200 || exit 1

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]