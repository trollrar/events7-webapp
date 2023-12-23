# Stage 1: Build the Angular app
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build --configuration=production

# Stage 2: Use NGINX to serve the Angular app
FROM nginx:alpine

COPY --from=builder /app/dist/events7-webapp /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
