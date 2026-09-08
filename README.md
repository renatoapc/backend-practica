# Todo API

## Descripción

API básica para crear, listar, actualizar y eliminar tareas.

Los datos se guardan en PostgreSQL usando una tabla `tasks`.


## Rutas

- GET /health: verifica que el servidor esté funcionando.
- GET /tasks: lista tareas del usuario autenticado.
- POST /tasks: crea una nueva tarea.
- PUT /tasks/:id: actualiza una tarea existente.
- DELETE /tasks/:id: elimina una tarea existente


## Base de datos

Base de datos: `todo_api`

Tabla: `tasks`

Columnas:

-`id`: identificador numérico generado automáticamente.
-`text`: texto obligatorio y único por usuario de la tarea.
-`done`: estado booleano de la tarea, por defecto `false`.


## Reglas

- `text` es obligatorio.
- `text` no puede estar vacío ni tener solo espacios
- `done` debe ser booleano.
- No puede haber tareas duplicadas con el mismo `text`.
- `id` debe ser numérico.
- Si una tarea no existe, la API responde `404`.


## Códigos de Respuesta

200 OK: petición exitosa
201 Created: tarea creada correctamente
400 Bad Request: datos inválidos
404 Not Found: tarea no encontrada
409 Conflict: tarea duplicada
500 Internal Server Error: error interno del servidor o de conexión con la base de datos.


## Pruebas manuales

GET /health -> 200 { "status": "ok" }
GET /tasks -> 200 lista de tareas
POST /tasks {} -> 400 { "message": "El texto es obligatorio" }
POST /tasks { "text": "   " } -> 400 { "message": "El texto es obligatorio" }
POST /tasks { "text": "A" } -> 201 tarea creada
POST /tasks { "text": "A" } -> 409 { "message": "La tarea ya existe" }
PUT /tasks/hola { "done": true } -> 400 { "message": "El id debe ser un número" }
PUT /tasks/999999 { "done": true } -> 404 { "message": "Tarea no encontrada" }
PUT /tasks/ID { "done": "true" } -> 400 { "message": "done debe ser booleano" }
DELETE /tasks/hola -> 400 { "message": "El id debe ser un número" }
DELETE /tasks/999999 -> 404 { "message": "Tarea no encontrada" }


## Estructura de Base de datos

La estructura inicial de la base de datos está en:

database/schema.sql


## Configuración local

1. Instalar dependencias:

   bash
   npm install

2. Crear un archivo .env basado en .env.example.
3. Crear base de datos todo_api en PostgreSQL.
4. Ejecutar el archivo database/schema.sql.
5. Iniciar el servidor:
   node server.js