/**
 * Estructura de una transacción.
 *
 * Como está basada en el funcionamiento de `Sequelize` se puede
 * pensar como un adaptador de `Sequelize.Transaction`.
 *
 * @example
 * ```typescript
 * // La transacción se debe de usar dentro de un bloque try/catch
 * try {
 *	// Creamos una transacción
 * 	const t = await transaction.createTransaction()
 * 	// llamadas a base de datos/modelo/repositorio
 *
 * 	await transaction.commit() // Aplicamos la transacción
 * } catch (e) {
 * 	// En caso de error se aplica el rollback
 *   await transaction.rollback()
 * }
 * ```
 * @typeParam T - El tipo de la transaction del ORM
 */
export interface BaseTransaction {
	createTransaction(): Promise<unknown>
	commit(): Promise<void>
	rollback(): Promise<void>
}
