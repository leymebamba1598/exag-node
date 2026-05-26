/**
 * infrastructure/http/middlewares/validatePerson.ts — Middleware de validación.
 *
 * Un middleware en Express es una función con la firma:
 *   (req, res, next) => void
 *
 * - Si los datos son válidos  → llama a next() para pasar al siguiente handler.
 * - Si los datos son inválidos → responde con 400 y CORTA la cadena (no llama next).
 *
 * PREGUNTA DE ENTREVISTA: ¿Cuál es la diferencia entre un middleware y un handler?
 * → Un handler termina el ciclo request-response (llama a res.json/send).
 *   Un middleware procesa la petición y decide si continúa (next) o la corta.
 *
 * PREGUNTA DE ENTREVISTA: ¿Por qué separar la validación en un middleware?
 * → Principio de Responsabilidad Única (SRP): el handler solo se ejecuta cuando
 *   los datos ya están garantizados como válidos. Además, el middleware se puede
 *   reutilizar en otras rutas (PUT /person/:id, por ejemplo).
 */

import { NextFunction, Request, Response } from 'express';

export function validatePerson(req: Request, res: Response, next: NextFunction): void {
  const { name, email } = req.body as { name?: string; email?: string };

  const errors: string[] = [];

  if (!name || name.trim() === '') {
    errors.push('name is required');
  }

  if (!email || email.trim() === '') {
    errors.push('email is required');
  }

  // Validación básica de formato de email con expresión regular.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email format is invalid');
  }

  // Si hay errores, respondemos 400 Bad Request y cortamos la cadena.
  if (errors.length > 0) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  // Todo correcto: pasamos al siguiente middleware o handler.
  next();
}
