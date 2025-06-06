# Build da aplicação Angular
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Servir com Nginx
FROM nginx:alpine

# Copiar arquivos de build
COPY --from=build /app/dist/frontend /usr/share/nginx/html


# Copiar config customizada (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
