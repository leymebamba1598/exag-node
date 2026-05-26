/**
 * infrastructure/http/controllers/UserController.ts — Controlador HTTP.
 *
 * El controller es otro "Adaptador" de la capa de infraestructura.
 * Su única responsabilidad es:
 *   1. Leer datos del request HTTP (params, body, query).
 *   2. Llamar al caso de uso correspondiente.
 *   3. Transformar el resultado en una respuesta HTTP.
 *
 * NO contiene lógica de negocio. Si necesitas cambiar de Express a Fastify,
 * solo cambias los controllers, los casos de uso permanecen intactos.
 *
 * PREGUNTA DE ENTREVISTA: ¿Por qué los métodos son arrow functions?
 * → Para que 'this' esté correctamente enlazado cuando Express los invoca
 *   como callbacks. Con métodos normales, 'this' sería undefined.
 */

import { Request, Response } from 'express';
import { CreateUser } from '../../../application/usecases/CreateUser';
import { DeleteUser } from '../../../application/usecases/DeleteUser';
import { GetAllUsers } from '../../../application/usecases/GetAllUsers';
import { GetUserById } from '../../../application/usecases/GetUserById';
import { UpdateUser } from '../../../application/usecases/UpdateUser';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getAllUsers: GetAllUsers,
    private readonly getUserById: GetUserById,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  // GET /users
  getAll = (req: Request, res: Response): void => {
    const users = this.getAllUsers.execute();
    res.json(users);
  };

  // GET /users/:id
  getById = (req: Request, res: Response): void => {
    // En Express 5, req.params puede ser string | string[]; forzamos string.
    const user = this.getUserById.execute(req.params.id as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  };

  // POST /users
  create = (req: Request, res: Response): void => {
    const { name, email } = req.body as { name?: string; email?: string };

    // Validación básica de entrada en la frontera del sistema (HTTP).
    if (!name || !email) {
      res.status(400).json({ message: 'name and email are required' });
      return;
    }

    const user = this.createUser.execute(name, email);
    // 201 Created: estándar HTTP para recursos creados exitosamente.
    res.status(201).json(user);
  };

  // PUT /users/:id
  update = (req: Request, res: Response): void => {
    const user = this.updateUser.execute(req.params.id as string, req.body as { name?: string; email?: string });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  };

  // DELETE /users/:id
  delete = (req: Request, res: Response): void => {
    const deleted = this.deleteUser.execute(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    // 204 No Content: estándar HTTP para eliminación exitosa sin cuerpo de respuesta.
    res.status(204).send();
  };
}
