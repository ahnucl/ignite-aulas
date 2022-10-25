/**
 * Criar classes de erro ajuda a identificar qual erro ocorreu
 */
export class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token.')
  }
}