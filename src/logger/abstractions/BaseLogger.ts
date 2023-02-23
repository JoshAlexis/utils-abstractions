/**
 * Define la estructura base de un `Logger`.
 */
export interface BaseLogger {
	/**
	 * Mensaje de nivel INFO
	 * @param message Mensaje a mostrar
	 * @param meta Metadatos del mensaje
	 */
	info(message: string, meta?: any): void
	/**
	 * Mensaje de nivel DEGUG
	 * @param message Mensaje a mostrar
	 * @param meta Metadatos del mensaje
	 */
	debug(message: string, meta?: any): void
	/**
	 * Mensaje de nivel ERROR
	 * @param message Mensaje a mostrar
	 * @param meta Metadatos del mensaje
	 */
	error(message: string, meta?: any): void
	/**
	 * Mensaje de nivel WARN
	 * @param message Mensaje a mostrar
	 * @param meta Metadatos del mensaje
	 */
	warn(message: string, meta?: any): void

	/**
	 * Mensaje de nivel HTTP
	 * @param message Mensaje a mostrar
	 * @param meta Metadatos del mensaje
	 */
	http(message: string, meta?: any): void
}
