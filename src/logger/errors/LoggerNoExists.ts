/**
 * Occurs when you want to get a logger that is no longer on the list.
 */
export class LoggerNotExistsError extends Error {
	status = 500

	constructor(loggerName: string) {
		super(`No existe una instancia registrada con el nombre ${loggerName}`)
		this.name = this.constructor.name
		Error.captureStackTrace(this, LoggerNotExistsError)
	}
}
