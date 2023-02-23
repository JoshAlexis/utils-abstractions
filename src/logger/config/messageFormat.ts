import winston from "winston"

/**
 * Genera el formato de mensajes de logging. Genera 2 formatos:
 * - Con información de los metadatos
 * - Sin metadatados
 * @param info La información a mostrar
 * @see {@link BaseMetadataFields}
 */
export function messageFormat(info: winston.Logform.TransformableInfo) {
  if (info.domain && info.layer) {
    return `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.domain}.${
      info.layer
    }.${info.context}]: ${info.message}`
  }
  return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
}
