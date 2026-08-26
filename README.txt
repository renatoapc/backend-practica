# Todo API

## Descripción

API básica para crear, listar, actualizar y eliminar tareas.

Los datos se guardan temporalmente en memoria usando un array.


## Rutas

- GET /health: verifica que el servidor esté funcionando.
- GET /tasks: lista todas las tareas.
- POST /tasks: crea una nueva tarea.
- PUT /tasks/:id: actualiza una tarea existente.
- DELETE /tasks/:id: elimina una tarea existente


## Reglas

- text es obligatorio.
- text no puede estar vacío ni tener solo espacios
- done debe ser booleano.
- No puede haber tareas duplicadas.
- id debe ser numérico.
- Si una tarea no existe, la API responde `404`.


## Códigos

200 OK: petición exitosa
201 Created: tarea creada correctamente
400 Bad Request: datos inválidos
404 Not Found: tarea no encontrada
409 Conflict: tarea duplicada


## Pruebas manuales

GET /health -> 200 { "status": "ok" }
GET /tasks -> 200 []
POST /tasks {} -> 400 { "message": "El texto es obligatorio" }
POST /tasks { "text": "   " } -> 400 { "message": "El texto es obligatorio" }
POST /tasks { "text": "A" } -> 201 { id, text: "A", done: false }
POST /tasks { "text": "A" } -> 409 { "message": "La tarea ya existe" }
PUT /tasks/hola { "done": true } -> 400 { "message": "El id debe ser un número" }
PUT /tasks/999999 { "done": true } -> 404 { "message": "Tarea no encontrada" }
PUT /tasks/ID { "done": "true" } -> 400 { "message": "done debe ser booleano" }
DELETE /tasks/hola -> 400 { "message": "El id debe ser un número" }
DELETE /tasks/999999 -> 404 { "message": "Tarea no encontrada" }

