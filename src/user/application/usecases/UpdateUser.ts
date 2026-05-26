/**
 * application/usecases/UpdateUser.ts — Caso de uso: Actualizar usuario.
 *
 * Usa 'Partial<Omit<User, 'id'>>' para permitir actualizar solo algunos campos
 * sin cambiar el id (que es inmutable).
 *
 * Partial<T>  → hace todos los campos opcionales.
 * Omit<T, K>  → excluye el campo 'id' del tipo.
 */

import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string, data: Partial<Omit<User, 'id'>>): User | undefined {
    return this.userRepository.update(id, data);
  }
}
