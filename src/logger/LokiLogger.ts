import winston from 'winston'
import LokiTransport from 'winston-loki'
import { BaseLogger } from './abstractions/BaseLogger'
import { getBaseLevel } from './config/getBaseLevel'
import { LOGGER_LEVELS } from './config/LoggerLevels'

const { printf, combine, timestamp } = winston.format

function messageFormat(info: winston.Logform.TransformableInfo) {
	if (info.labels.domain && info.labels.layer) {
		return `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.labels.domain}.${info.labels.layer}.${
			info.labels.context
		}]: ${info.message}`
	}
	return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
}

/**
 * Instancia de `Winston` con configuración de `transport` para `Grafana Loki`.
 * Depende de las variables `LOKI_SERVER` y `LOKI_INTERVAL`.
 *
 * Es necesario asignar el label de `app` para poder identificar qué servicio genera los logs.
 */
export class LokiLogger implements BaseLogger {
	protected readonly loki: winston.Logger

	/**
	 * Label para nombre de aplicación.
	 */
	app = 'logger-container'

	constructor() {
		this.loki = winston.createLogger({
			level: getBaseLevel(),
			levels: LOGGER_LEVELS,
			transports: [
				new LokiTransport({
					host: process.env.LOKI_SERVER || 'http://localhost:3100',
					interval: (process.env.LOKI_INTERVAL || 5) as number,
					json: true,
					labels: {
						app: this.app
					},
					format: combine(
						timestamp({
							format: 'YYYY-MM-DD hh:mm:ss.SSSS A'
						}),
						printf(messageFormat)
					),
					handleExceptions: true,
					handleRejections: true,
					gracefulShutdown: true,
					onConnectionError: (err) => {
						console.log((err as Error).message)
					}
				})
			]
		})
	}

	info(message: string, meta?: any) {
		this.loki.info({ message, labels: { ...meta } })
	}

	debug(message: string, meta?: any) {
		this.loki.debug({ message, labels: { ...meta } })
	}

	http(message: string, meta?: any) {
		this.loki.http({ message, labels: { ...meta } })
	}

	error(message: string, meta?: any) {
		this.loki.error({ message, labels: { ...meta } })
	}

	warn(message: string, meta?: any) {
		this.loki.warn({ message, labels: { ...meta } })
	}
}
