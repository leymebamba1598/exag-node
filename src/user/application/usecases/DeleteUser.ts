/**
 * application/usecases/DeleteUser.ts — Caso de uso: Eliminar usuario.
 *
 * Devuelve un booleano para indicar si el usuario existía y fue eliminado.
 * El controller decidirá si eso significa 200, 204 o 404.
 */

import { UserRepository } from '../../domain/repositories/UserRepository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string): boolean {
    return this.userRepository.delete(id);
  }
}
