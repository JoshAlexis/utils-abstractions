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
 * Uses `Winston` with the transport configuration for `Grafana Loki`.
 * Depends on `LOKI_SERVER`, `LOKI_INTERVAL` and `LOKI_APP_LABEL` env.
 *
 * You need to assign the `LOKI_APP_LABEL` env to be able to identify which service is generating the logs.
 */
export class LokiLogger implements BaseLogger {
	protected readonly loki: winston.Logger

	constructor() {
		this.loki = winston.createLogger({
			level: getBaseLevel(),
			levels: LOGGER_LEVELS,
			transports: [
				new LokiTransport({
					host: process.env?.LOKI_SERVER || 'http://localhost:3100',
					interval: (process.env?.LOKI_INTERVAL || 5) as number,
					json: true,
					labels: {
						app: process.env?.LOKI_APP_LABEL || 'logger-container'
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
