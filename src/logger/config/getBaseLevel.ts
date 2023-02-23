/**
 * Obtiene el nivel base de logging dependiendo de `NODE_ENV`.
 */
export function getBaseLevel() {
  const env = process.env.NODE_ENV || "development"
  const isDevelopment = env === "development" || env === "debug"
  return isDevelopment ? "debug" : "http"
}
