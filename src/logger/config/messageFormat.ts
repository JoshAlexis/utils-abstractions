import winston from 'winston'

/**
 * Generates the message format for logging. Creates 2 formats:
 * - With the metadata when the respective fields are with values
 * - Without metadata
 * @param info
 * @see {@link BaseMetadataFields}
 */
export function messageFormat(info: winston.Logform.TransformableInfo) {
	if (info?.domain && info?.layer) {
		return `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.domain}.${info.layer}.${info.context}]: ${
			info.message
		}`
	}
	return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
}
