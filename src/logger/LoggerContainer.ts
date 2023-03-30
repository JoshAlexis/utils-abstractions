import { injectable } from 'inversify'
import { BaseLogger } from './abstractions/BaseLogger'
import { LoggerAlreadyRegisteredError } from './errors/LoggerAlreadyRegisteredError'
import { LoggerNotExistsError } from './errors/LoggerNoExists'

/**
 * Stores implementations of `BaseLogger`.
 *
 * Because you can have different logging mechanisms (console, files, stream, etc.) this container keeps all the
 * defined implementations and allows you, either all or one definition depending on the needed context.
 *
 * Each implementation is mapped to a name, this allows you to select an instance to use. In the case we want to use
 * all the registered implementations you can use the log level method that you need.
 *
 * Also, it is configured to be used as dependency with [Inversify](https://inversify.io/).
 *
 * @example
 *
 * // Register a new logger, in case there already exists throws an error
 * loggerContainer.addLogger('winston-console', new WinstonLogger())
 *
 * // Get an instancia, in case there is no exists throws an error
 * const logger = loggerContainer.getLogger('winston-console')
 *
 * logger.debug('Hello ..')
 *
 * // Delete an instance, in case there is no exists throws an error
 * loggerContainer.removeLogger('winston-console')
 *
 * // Use all registered loggers
 * loggerContainer.info('Logging for all')
 */
@injectable()
export class LoggerContainer implements BaseLogger {
	/**
	 * List of register instances
	 * @private
	 */
	private readonly loggers: Map<string, BaseLogger>

	constructor() {
		this.loggers = new Map()
	}

	/**
	 * Adds a new logger instance to the registry
	 * @param name Name of the instance
	 * @param logger Instance to register
	 * @throws {@link Shared.LoggerAlreadyRegisteredError}
	 */
	addLogger(name: string, logger: BaseLogger): void {
		if (!this.loggers.has(name)) this.loggers.set(name, logger)
		else throw new LoggerAlreadyRegisteredError(name)
	}

	/**
	 * Deletes and instance
	 * @param name Name of the instance
	 * @throws {@link Shared.LoggerNotExists}
	 */
	removeLogger(name: string): void {
		if (this.loggers.has(name)) {
			this.loggers.delete(name)
		} else throw new LoggerNotExistsError(name)
	}

	/**
	 * Gets and instance
	 * @param name Nombre de la instancia
	 * @throws {@link Shared.LoggerNotExists}
	 */
	getLogger(name: string): BaseLogger {
		if (this.loggers.has(name)) {
			return this.loggers.get(name) as BaseLogger
		}
		throw new LoggerNotExistsError(name)
	}

	debug(message: string, meta?: any): void {
		this.useAllLoggers('debug', message, meta)
	}

	error(message: string, meta?: any): void {
		this.useAllLoggers('error', message, meta)
	}

	http(message: string, meta?: any): void {
		this.useAllLoggers('http', message, meta)
	}

	info(message: string, meta?: any): void {
		this.useAllLoggers('info', message, meta)
	}

	warn(message: string, meta?: any): void {
		this.useAllLoggers('warn', message, meta)
	}

	/**
	 * iterates sobre los loggers registrados y llama al método indicado.
	 * Iterates over the registered logger and calls the corresponding method.
	 * @param level Log level
	 * @param message
	 * @param meta
	 * @private
	 */
	private useAllLoggers(level: keyof BaseLogger, message: string, meta?: any) {
		// eslint-disable-next-line no-restricted-syntax
		for (const logger of this.loggers.values()) {
			logger[level](message, meta)
		}
	}
}
