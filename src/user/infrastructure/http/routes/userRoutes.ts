/**
 * infrastructure/http/routes/userRoutes.ts — Definición de rutas HTTP.
 *
 * Separa la definición de rutas del controller para que cada archivo
 * tenga una sola responsabilidad (principio SRP de SOLID).
 *
 * Recibe el controller como parámetro (inyección de dependencias)
 * en lugar de instanciarlo aquí, lo que facilita los tests.
 *
 * Convención REST utilizada:
 *   GET    /users       → listar todos
 *   GET    /users/:id   → obtener uno
 *   POST   /users       → crear
 *   PUT    /users/:id   → reemplazar/actualizar
 *   DELETE /users/:id   → eliminar
 */

import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export function createUserRouter(controller: UserController): Router {
  const router = Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
}
