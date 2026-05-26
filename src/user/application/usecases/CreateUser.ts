/**
 * application/usecases/CreateUser.ts — Caso de uso: Crear usuario.
 *
 * En arquitectura hexagonal, la capa de aplicación orquesta el flujo
 * de negocio. Cada caso de uso representa UNA acción del sistema.
 *
 * Recibe el puerto (UserRepository) por inyección de dependencias en el
 * constructor. Así no sabe si el repositorio usa un array, MongoDB o SQL.
 *
 * PREGUNTA DE ENTREVISTA: ¿Por qué se inyecta la interfaz y no la clase?
 * → Para cumplir el principio de Inversión de Dependencias (D de SOLID).
 *   El caso de uso depende de una abstracción, no de una implementación concreta.
 */

import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class CreateUser {
  // La dependencia llega desde afuera: Dependency Injection.
  constructor(private readonly userRepository: UserRepository) {}

  execute(name: string, email: string): User {
    // Generamos el id aquí, en el dominio/aplicación, no en la infraestructura.
    const user: User = { id: randomUUID(), name, email };
    return this.userRepository.save(user);
  }
}
