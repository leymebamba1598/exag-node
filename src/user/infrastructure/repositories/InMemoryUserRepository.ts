/**
 * infrastructure/repositories/InMemoryUserRepository.ts — Adaptador de persistencia.
 *
 * Este es el "Adaptador" (Adapter) de la arquitectura hexagonal.
 * IMPLEMENTA el puerto (UserRepository) usando un simple arreglo en memoria.
 *
 * Ventajas de esta separación:
 *  - Para cambiar a una base de datos real (MongoDB, PostgreSQL) solo se crea
 *    otro adaptador que implemente la misma interfaz. El resto del código no cambia.
 *  - Facilita los tests unitarios: puedes usar este repositorio en memoria sin
 *    necesitar levantar ninguna base de datos.
 *
 * PREGUNTA DE ENTREVISTA: ¿Qué patrón de diseño aplica aquí?
 * → Repository Pattern + Adapter Pattern.
 */

import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  // El arreglo actúa como nuestra "base de datos" en memoria.
  // 'private' garantiza que solo este adaptador puede manipularlo directamente.
  private users: User[] = [];

  findAll(): User[] {
    // Devolvemos una copia para evitar que el exterior mute el estado interno.
    return [...this.users];
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  save(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: string, data: Partial<Omit<User, 'id'>>): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    // Spread operator: fusiona el objeto existente con los nuevos datos.
    // El id no puede ser reemplazado porque está excluido en el tipo.
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    // splice(index, 1) elimina 1 elemento en la posición dada.
    this.users.splice(index, 1);
    return true;
  }
}
