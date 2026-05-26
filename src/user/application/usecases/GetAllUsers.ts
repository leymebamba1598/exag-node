/**
 * application/usecases/GetAllUsers.ts — Caso de uso: Obtener todos los usuarios.
 *
 * Caso de uso de solo lectura (query). En arquitectura CQRS (Command Query
 * Responsibility Segregation) este sería un "Query", mientras que CreateUser
 * sería un "Command". Aquí lo simplificamos en una sola capa de aplicación.
 */

import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): User[] {
    return this.userRepository.findAll();
  }
}
