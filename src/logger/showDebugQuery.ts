export function showDebugQuery(message: string, query: string): string {
  return process.env.SHOW_QUERY === "show"
    ? `${message}. Query: ${query.trim()}`
    : message;
}
