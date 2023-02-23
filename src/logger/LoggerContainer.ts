import { injectable } from 'inversify'
import { BaseLogger } from './abstractions/BaseLogger'
import { LoggerAlreadyRegisteredError } from './errors/LoggerAlreadyRegisteredError'
import { LoggerNotExistsError } from './errors/LoggerNoExists'

/**
 * Almacena implementaciones de loggers.
 *
 * Debido a que se pueden tener diferentes mecanismos de logging (consola, archivos, etc.)
 * este contenedor almacena todas las implementaciones definidas y permite usar, ya sea todas o
 * solo una instancia de un tipo dependiendo del contexto.
 *
 * Las implementaciones se mapean con un nombre, lo que permite indicar que instancia a utilizar.
 * En el caso de que se quieran emplear todos los logger registrados se llama a algunos de los
 * métodos de nivel de log.
 *
 * También está configurador para ser inyectado como dependencia usando `inversify`.
 *
 * @example
 *
 * // Registrar nuevo logger, en caso de que ya exista arroja un error
 * loggerContainer.addLogger('winston-console', new WinstonLogger())
 *
 * // Obtener instancia, en caso de que no exista arroja un error
 * const logger = loggerContainer.getLogger('winston-console')
 *
 * logger.debug('Hello ..')
 *
 * // Eliminar instancia, en caso de que no exista arroja un error
 * loggerContainer.removeLogger('winston-console')
 *
 * // Usar todos los logger registrados
 *
 * loggerContainer.info('Logging for all')
 *
 * // Eliminar una instancia
 * loggerContainer.remove('winston-console')
 *
 */
@injectable()
export class LoggerContainer implements BaseLogger {
	/**
	 * Las diferentes implementaciones.
	 * @private
	 */
	private readonly loggers: Map<string, BaseLogger>

	constructor() {
		this.loggers = new Map()
	}

	/**
	 * Añade un logger al registro.
	 * @param name El nombre con el que se registrará
	 * @param logger La instancia a registrar
	 * @throws {@link Shared.LoggerAlreadyRegisteredError}
	 */
	addLogger(name: string, logger: BaseLogger): void {
		if (!this.loggers.has(name)) this.loggers.set(name, logger)
		else throw new LoggerAlreadyRegisteredError(name)
	}

	/**
	 * Elimina un logger del registro
	 * @param name Nombre de la instancia
	 * @throws {@link Shared.LoggerNotExists}
	 */
	removeLogger(name: string): void {
		if (this.loggers.has(name)) {
			this.loggers.delete(name)
		} else throw new LoggerNotExistsError(name)
	}

	/**
	 * Obtiene una instancia
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
	 * Itera sobre los loggers registrados y llama al método indicado.
	 * @param level
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
