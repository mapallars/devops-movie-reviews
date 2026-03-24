# DevOps Movie Reviews

Este proyecto es una aplicación web para la gestión y publicación de reseñas de películas. Cuenta con un backend robusto desarrollado en Node.js, Express y Sequelize, y un frontend moderno con React y Vite.

## Estructura del Proyecto

El repositorio está dividido en dos directorios principales:

-   **/api**: Backend de la aplicación (Node.js, Express, PostgreSQL, Sequelize).
-   **/app**: Frontend de la aplicación (React, Vite, TailwindCSS).

## Configuración y Variables de Entorno

Para ejecutar el proyecto localmente, es necesario configurar las variables de entorno tanto para el backend como para el frontend (si aplica).

### Backend (`/api`)

Crea un archivo llamado `.env` dentro del directorio `/api` siguiendo esta estructura:

```env
DB_HOST=localhost
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=movie_reviews_db
DB_PORT=5432
JWT_SECRET=tu_secreto_para_jwt
PORT=8080
```

*Nota: Asegúrate de tener una base de datos PostgreSQL creada con el nombre especificado en `DB_NAME`.*

### Frontend (`/app`)

El frontend está configurado para comunicarse con el backend mediante un proxy en el puerto `8080` (configurado en `vite.config.js`). Por defecto, el frontend corre en el puerto `3000`.

## Instalación y Ejecución

1.  **Clonar el repositorio.**
2.  **Configurar dependencias del Backend:**
    ```bash
    cd api
    npm install
    npm start
    ```
3.  **Configurar dependencias del Frontend:**
    ```bash
    cd ../app
    npm install
    npm run dev
    ```

## Características Principales

-   Autenticación de usuarios (Registro e Inicio de sesión).
-   Roles de usuario (Usuario y Administrador).
-   Gestión de películas (Creación, listado y detalles).
-   Sistema de reseñas con calificación de 1 a 5 estrellas.
-   Migración completa a ES Modules en el backend.
