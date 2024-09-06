# API de NestJS con MongoDB

Api Para creacion, obtencion y actualizacion de usuarios, con endpoints para authenticacion.
La aplicacion correra en el puerto 8000 al ser levantada con docker.

## Requisitos

- Docker y Docker Compose
- Nodejs (version 18 en adelante)

## Instalacion

- Una vez clonado el repositorio, ejecutar los comandos:
- npm install
- docker-compose up -d

## Estructura del Proyecto

- `src/`
  - `auth/` - Módulo de autenticación
  - `users/` - Módulo de usuarios
  - `main.ts` - Archivo principal de la aplicación

## Configuración del Entorno

- No se agregaron variables de entornos para que se pueda probar tranquilamente.

## Endpoints

### Autenticación

- **Login**

  - **Método:** `POST`
  - **Ruta:** `/auth/login`
  - **Descripción:** Permite a los usuarios autenticarse y obtener un token JWT.
  - **Cuerpo de la Solicitud:**

    ```json
    {
      "name": "nombre del usuario",
      "password": "contraseña"
    }
    ```

  - **Respuesta Exitoso:**

    ```json
    {
      "access_token": "token_jwt"
    }
    ```

  - **Ejemplo:**

    ```bash
    curl -X POST http://localhost:8000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"name": "usuario", "password": "contraseña"}'
    ```

### Usuarios

- **Registrar Usuario**

  - **Método:** `POST`
  - **Ruta:** `/users`
  - **Descripción:** Registra un nuevo usuario en la base de datos.
  - **Sin authenticacion**
  - **Cuerpo de la Solicitud:**

    ```json
    {
      "name": "nuevo_usuario",
      "password": "nueva_contraseña",
      "last_name": "last_name",
      "address": "direccion",
      "profile_picture_url": "https://www.google.com"
    }
    ```

    - **Ejemplo:**

    ```bash
    curl -X POST http://localhost:8000/users \
    -H "Content-Type: application/json" \
    -d '{"name": "usuario", "password": "contraseña", "last_name":"apellido","address":"adasd","profile_picture_url":"www.google.com}'
    ```

- **Buscar Todos los Usuarios**

  - **Método:** `GET`
  - **Ruta:** `/users`
  - **Descripción:** Obtiene una lista de todos los usuarios registrados.
  - **Con authenticacion** Se debe estar logeado para consumir este endpoint.
  - **Respuesta Exitoso:**

    ```json
    [
      {
        "id": "id_del_usuario",
        "name": "usuario1",
        "last_name": "asd",
        "address": "123",
        "profile_picture_url": "www.google.com"
      }
    ]
    ```

    - **Ejemplo:**

    ```bash
    curl -X GET http://localhost:8000/users \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```

- **Actualizar Usuario**

  - **Método:** `PATCH`
  - **Ruta:** `/users/:id`
  - **Descripción:** Actualiza parcialmente la información de un usuario específico.
  - **Con authenticacion** Se debe estar logeado para consumir este endpoint.
  - **Parámetros de Ruta:**
    - `id` - ID del usuario a actualizar
  - **Cuerpo de la Solicitud:** El cuerpo tiene que ir si o si con un atributo del usuario.

    ```json
    {
      "name": "nuevo_nombre_de_usuario"
    }
    ```

    - **Ejemplo:**

    ```bash
    curl -X PATCH http://localhost:8000/users/<ID_DEL_USUARIO> \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{"name": "nuevo nombre"}'
    ```
