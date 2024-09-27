# Sử dụng Node.js LTS làm base image
FROM node:lts

# Tạo một thư mục app trong container để lưu trữ ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục app
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN yarn install

# Sao chép tất cả mã nguồn của ứng dụng vào thư mục app
COPY . .

# Build ứng dụng
RUN yarn build

# Chạy ứng dụng
CMD [ "npm", "start" ]

# Expose cổng 3000 để cho phép truy cập ứng dụng
EXPOSE 3000
