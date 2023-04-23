// import 'reflect-metadata'
import { Container } from 'inversify'
import { LoggerContainer, WinstonLogger } from '../../src/logger'
import { LoggerAlreadyRegisteredError } from '../../src/logger/errors/LoggerAlreadyRegisteredError'
import { LoggerNotExistsError } from '../../src/logger/errors/LoggerNoExists'

describe('LoggerContainer', () => {
	const container = new Container()

	it('Should add LoggerContainer to Inversify Container', () => {
		container.bind(LoggerContainer).toSelf()

		expect(container.get(LoggerContainer)).toBeInstanceOf(LoggerContainer)
	})

	it('Should add a new logger to the container', () => {
		const logger = container.get(LoggerContainer)

		logger.addLogger('console', new WinstonLogger())

		expect(logger.getLogger('console')).toBeInstanceOf(WinstonLogger)
	})

	it('Should fail when a logger with the same name is loaded', () => {
		const logger = container.get(LoggerContainer)

		logger.addLogger('console', new WinstonLogger())

		expect(() => logger.addLogger('console', new WinstonLogger())).toThrow(LoggerAlreadyRegisteredError)
	})

	it('Should fail when a logger with the same name is loaded', () => {
		const logger = container.get(LoggerContainer)

		logger.addLogger('console', new WinstonLogger())

		expect(() => logger.getLogger('wrong-name')).toThrow(LoggerNotExistsError)
	})
})
