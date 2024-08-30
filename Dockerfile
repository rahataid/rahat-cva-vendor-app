# Stage 1 - the build process
FROM node:18-alpine3.17 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.23.1-alpine
# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf.d /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html 
# Static build
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html 

# Default port exposure
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]