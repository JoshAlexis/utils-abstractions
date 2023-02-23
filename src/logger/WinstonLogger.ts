import winston from 'winston'
import { BaseLogger } from './abstractions/BaseLogger'
import { getBaseLevel } from './config/getBaseLevel'
import { LEVEL_COLORS } from './config/LevelColors'
import { LOGGER_LEVELS } from './config/LoggerLevels'
import { messageFormat } from './config/messageFormat'
import { transportWithColors } from './config/transportWithColors'

const { combine, timestamp, printf } = winston.format

export class WinstonLogger implements BaseLogger {
	/**
	 * Configuración de `logger` con `winston`.
	 * @private
	 */
	private readonly winstonLogger: winston.Logger

	constructor() {
		winston.addColors(LEVEL_COLORS)
		this.winstonLogger = winston.createLogger({
			level: getBaseLevel(),
			levels: LOGGER_LEVELS,
			format: combine(
				timestamp({
					format: 'YYYY-MM-DD hh:mm:ss.SSSS A'
				}),
				printf(messageFormat)
			),
			transports: [transportWithColors()],
			exitOnError: false
		})
	}

	debug(message: string, meta?: any): void {
		this.winstonLogger.debug(message, meta)
	}

	error(message: string, meta?: any): void {
		this.winstonLogger.error(message, meta)
	}

	info(message: string, meta?: any): void {
		this.winstonLogger.info(message, meta)
	}

	warn(message: string, meta?: any): void {
		this.winstonLogger.warn(message, meta)
	}

	http(message: string, meta?: any) {
		this.winstonLogger.http(message, meta)
	}
}
