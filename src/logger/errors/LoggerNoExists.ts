/**
 * Ocurre cuando se está quiere obtener un logger que ya no está en la lista.
 */
export class LoggerNotExistsError extends Error {
	status = 500

	constructor(loggerName: string) {
		super(`No existe una instancia registrada con el nombre ${loggerName}`)
		this.name = this.constructor.name
		Error.captureStackTrace(this, LoggerNotExistsError)
	}
}
