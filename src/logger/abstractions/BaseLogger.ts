/**
 * Base structure of a logger.
 */
export interface BaseLogger {
	/**
	 * @param message
	 * @param meta
	 */
	info(message: string, meta?: any): void
	/**
	 * @param message
	 * @param meta
	 */
	debug(message: string, meta?: any): void
	/**
	 * @param message
	 * @param meta
	 */
	error(message: string, meta?: any): void
	/**
	 * @param message
	 * @param meta
	 */
	warn(message: string, meta?: any): void

	/**
	 * @param message
	 * @param meta
	 */
	http(message: string, meta?: any): void
}
