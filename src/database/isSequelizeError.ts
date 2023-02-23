/**
 * Lista de errores de `Sequelize`. No todos los errores posibles.
 *
 */
export const SequelizeError = ['DatabaseError', 'AggregateError', 'ValidationError', 'SequelizeDatabaseError']

/**
 * Verifica si un error proviene de `Sequelize`.
 * @param error El error a verificar
 *
 */
export function isSequelizeError(error: unknown): boolean {
	return SequelizeError.includes((error as Error).name)
}
