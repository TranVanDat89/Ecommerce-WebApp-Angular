#!/bin/sh
echo "Starting Angular app configuration..."
# Mặc định API URL nếu không được cung cấp
DEFAULT_API_URL="http://localhost:8088/ecommerce/api/v1"
API_URL=${API_BASE_URL:-$DEFAULT_API_URL}
echo "Configuring API Base URL: $API_URL"
# Tìm và thay thế placeholder trong tất cả file JS đã build
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|__API_BASE_URL__|$API_URL|g" {} \;
echo "Configuration completed!"
# Khởi động Nginx
echo "Starting Nginx server..."
nginx -g "daemon off;"