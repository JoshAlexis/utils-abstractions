/**
 * Base transaction's structure. Is based on `Sequelize.Transaction` and
 * can be considered as a wrapper.
 *
 * @example
 * ```typescript
 * // Must be used inside a try/catch block
 * try {
 * 	const t = await transaction.createTransaction()
 * 	// Calling the database
 *
 * 	await transaction.commit()
 * } catch (e) {
 *   await transaction.rollback()
 * }
 * ```
 * @typeParam T - Transaction Type from ORM
 */
export interface BaseTransaction {
	createTransaction(): Promise<unknown>
	commit(): Promise<void>
	rollback(): Promise<void>
}
