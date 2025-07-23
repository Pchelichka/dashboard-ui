# Use Node for build, then Nginx for serve
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /
COPY ./nginx/nginx.conf /etc/nginx
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]