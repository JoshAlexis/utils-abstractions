/**
 * Adds the query to the log message. Depends on `SHOW_QUERY` env.
 * @param message
 * @param query String query
 */
export function showDebugQuery(message: string, query: string): string {
	return process.env.SHOW_QUERY === 'show' ? `${message}. Query: ${query.trim()}` : message
}
