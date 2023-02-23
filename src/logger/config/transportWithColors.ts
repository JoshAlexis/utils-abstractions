import winston from 'winston'

/**
 * Crea un `transport` de consola con o sin colores, a partir
 * de la variable de entorno `NODE_ENV`.
 */
export function transportWithColors() {
	const env = process.env.NODE_ENV || 'development'

	if (env === 'development') {
		return new winston.transports.Console({
			format: winston.format.colorize({ all: true }),
			handleExceptions: true,
			handleRejections: true
		})
	}

	return new winston.transports.Console()
}
