/**
 * src/index.ts — Punto de entrada y composición de dependencias (DI Root).
 *
 * Este archivo es el único lugar donde se instancian las clases concretas
 * y se "ensambla" la aplicación. Es conocido como el "Composition Root".
 *
 * FLUJO DE DEPENDENCIAS en arquitectura hexagonal:
 *
 *   Infrastructure  →  Application  →  Domain
 *        ↑                  ↑
 *   (Controller)       (Use Cases)
 *        ↑
 *    (Routes)
 *
 * El dominio no conoce a nadie. La aplicación solo conoce al dominio.
 * La infraestructura conoce a todos, pero NADIE depende de ella directamente.
 *
 * PREGUNTA DE ENTREVISTA: ¿Qué es Dependency Injection?
 * → Es un patrón donde los objetos reciben sus dependencias desde afuera
 *   en lugar de crearlas internamente. Permite intercambiar implementaciones
 *   sin modificar el código que las usa (ej: pasar de InMemory a MongoDB).
 */

import express, { NextFunction } from 'express';

// ─── Infraestructura: Adaptador de persistencia ──────────────────────────────
import { InMemoryUserRepository } from './user/infrastructure/repositories/InMemoryUserRepository';

// ─── Aplicación: Casos de uso ────────────────────────────────────────────────
import { CreateUser } from './user/application/usecases/CreateUser';
import { DeleteUser } from './user/application/usecases/DeleteUser';
import { GetAllUsers } from './user/application/usecases/GetAllUsers';
import { GetUserById } from './user/application/usecases/GetUserById';
import { UpdateUser } from './user/application/usecases/UpdateUser';

// ─── Infraestructura: Adaptador HTTP ─────────────────────────────────────────
import { UserController } from './user/infrastructure/http/controllers/UserController';
import { createUserRouter } from './user/infrastructure/http/routes/userRoutes';
import { validatePerson } from './infrastructure/http/middlewares/validatePerson';

// ─── Composition Root: Ensamblamos todas las dependencias ────────────────────

// 1. Instanciamos el adaptador de persistencia (la "base de datos" en memoria).
const userRepository = new InMemoryUserRepository();

// 2. Inyectamos el repositorio en cada caso de uso.
const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

// 3. Inyectamos los casos de uso en el controller.
const userController = new UserController(
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
);

// ─── Configuración de Express ────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global: parsea el body de las peticiones JSON.
app.use(express.json());

// 4. Registramos las rutas, pasando el controller ya ensamblado.
// Todas las rutas de usuarios quedan bajo el prefijo /users.
app.use('/users', createUserRouter(userController));

// Ruta temporal de prueba para /person.
// validatePerson se ejecuta PRIMERO: si falla, corta y devuelve 400.
// Si pasa, el segundo handler recibe la petición ya validada.
// TODO: mover a su propio CRUD con arquitectura hexagonal.
app.post('/person', validatePerson, (req, res) => {
  res.status(201).json({ message: 'Person created successfully' });
});

// ─── Inicio del servidor ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
