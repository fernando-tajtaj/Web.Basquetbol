# Etapa 1: Construir Angular
FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# IMPORTANTE: Limpia el directorio por defecto de Nginx primero
RUN rm -rf /usr/share/nginx/html/*

# Ahora copia tus archivos
COPY --from=build /app/dist/Web.Basquetbol/browser /usr/share/nginx/html

# Copia la configuración
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]