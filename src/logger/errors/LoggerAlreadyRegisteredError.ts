/**
 * Ocurre cuando se está registrando un logger que ya existe.
 */
export class LoggerAlreadyRegisteredError extends Error {
	status = 500

	constructor(loggerName: string) {
		super(`El logger ${loggerName} ya está registrado`)
		this.name = this.constructor.name
		Error.captureStackTrace(this, LoggerAlreadyRegisteredError)
	}
}
