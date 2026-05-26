/**
 * domain/entities/User.ts — Entidad principal del dominio.
 *
 * En arquitectura hexagonal, el dominio es el núcleo de la aplicación.
 * Las entidades representan los objetos de negocio y NO dependen de
 * ninguna librería externa (ni Express, ni base de datos, ni nada).
 *
 * Una entidad se identifica por su 'id' único, a diferencia de un
 * Value Object que se identifica por sus atributos.
 */

export interface User {
  /** Identificador único del usuario (UUID). */
  id: string;
  /** Nombre completo del usuario. */
  name: string;
  /** Correo electrónico del usuario. */
  email: string;
}
