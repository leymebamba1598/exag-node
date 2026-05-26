/**
 * domain/repositories/UserRepository.ts — Puerto (Port) del repositorio.
 *
 * En arquitectura hexagonal, un "puerto" es una INTERFAZ que define
 * QUÉ operaciones necesita el dominio, sin importar CÓMO se implementan.
 *
 * - El dominio DEFINE la interfaz (puerto).
 * - La infraestructura IMPLEMENTA la interfaz (adaptador).
 *
 * Esto desacopla completamente el dominio del mecanismo de persistencia.
 * Puedes cambiar de array en memoria a PostgreSQL sin tocar nada del
 * dominio ni de la capa de aplicación.
 */

import { User } from '../entities/User';

export interface UserRepository {
  /** Devuelve todos los usuarios. */
  findAll(): User[];

  /** Busca un usuario por su id. Devuelve undefined si no existe. */
  findById(id: string): User | undefined;

  /** Persiste un nuevo usuario y lo devuelve. */
  save(user: User): User;

  /** Actualiza campos de un usuario existente. Devuelve undefined si no existe. */
  update(id: string, data: Partial<Omit<User, 'id'>>): User | undefined;

  /** Elimina un usuario. Devuelve true si se eliminó, false si no existía. */
  delete(id: string): boolean;
}
