# Web Basquetbol (Angular)

Aplicación web en Angular para gestionar entidades relacionadas con básquetbol (equipos, jugadores, partidos y reportes). El proyecto usa Angular 20, Bootstrap 5 y JWT para autenticación.

## Requisitos

- Node.js 20+ (recomendado 22)
- npm 10+
- Angular CLI (`npm i -g @angular/cli`) opcional para usar `ng` globalmente

## Instalación

```bash
npm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm start   # o: ng serve
```

Abrir `http://localhost:4200/`. Recarga automática al guardar cambios.

## Scripts npm

- `npm start`: arranca el dev server.
- `npm run build`: compila para producción a `dist/Web.Basquetbol`.
- `npm run watch`: compila en modo desarrollo con watch.
- `npm test`: ejecuta pruebas unitarias (Karma/Jasmine).

## Configuración de API y Auth

- Base de API: ajustar `Global.url` en `src/app/services/global.ts`. Por defecto: `/api`.
- Autenticación: el token JWT se guarda en `localStorage` y el interceptor (`src/app/interceptors/auth.interceptor.ts`) adjunta `Authorization: Bearer <token>` a cada petición. Ante `401` se limpia sesión y redirige a `/login`.

## Construcción para producción

```bash
npm run build
```

Salida en `dist/Web.Basquetbol`. Se habilita `outputHashing` y optimizaciones en `production`.

## Docker (Build y Run)

El proyecto incluye un `Dockerfile` multi-stage que construye Angular y sirve con Nginx.

```bash
# Construir imagen
docker build -t web-basquetbol .

# Ejecutar contenedor
docker run --rm -p 8080:80 web-basquetbol
```

- La app quedará disponible en `http://localhost:8080`.
- Nginx usa `nginx.conf` con `try_files` para SPA. Si el backend está detrás del mismo dominio bajo `/api`, asegúrate de exponerlo o de configurar el proxy inverso correspondiente.

## Pruebas

Unitarias (Karma/Jasmine):

```bash
npm test
```

Este proyecto no incluye e2e por defecto; puedes integrar la herramienta de tu preferencia.

## Estructura del proyecto (resumen)

- `src/app/components`: componentes de UI (home, admin, navbar, auth, etc.).
- `src/app/pages`: módulos de páginas (team, player, match, report, admin).
- `src/app/services`: servicios para `auth`, `team`, `player`, `match`, `report`, etc.
- `src/app/models/dto`: DTOs de dominio (team, player, match, status, city, nationality, login).
- `src/app/interceptors`: interceptor de autenticación JWT.
- `src/app/core`: guards (`auth-guard`, `role.guard`).
- `public`: assets estáticos (p.ej. `favicon.ico`).

## Notas de despliegue

- La salida estática puede servirse en cualquier hosting web (Nginx/Apache/CDN).
- Para Nginx, el `nginx.conf` incluido ya maneja rutas de SPA y sirve desde `/usr/share/nginx/html`.
- Si tu API vive en otro host/origen, configura CORS en el backend o usa un proxy.

## Referencias

- Angular CLI: https://angular.dev/tools/cli
