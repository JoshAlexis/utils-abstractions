/**
 * Añade el query a los mensajes de log a partir de la env `SHOW_QUERY`
 * @param message
 * @param query
 */
export function showDebugQuery(message: string, query: string): string {
	return process.env.SHOW_QUERY === 'show' ? `${message}. Query: ${query.trim()}` : message
}
