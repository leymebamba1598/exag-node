/**
 * application/usecases/GetUserById.ts — Caso de uso: Obtener usuario por ID.
 *
 * Devuelve undefined si el usuario no existe. La decisión de qué código HTTP
 * retornar (404) es responsabilidad de la capa de infraestructura (controller),
 * NO de este caso de uso. El dominio no sabe nada de HTTP.
 */

import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class GetUserById {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string): User | undefined {
    return this.userRepository.findById(id);
  }
}
