import { getBaseLevel } from '../../../src/logger/config/getBaseLevel'

describe('getBaseLevel', () => {
	const OldEnv = process.env

	beforeAll(() => {
		jest.resetModules()
		process.env = {
			...OldEnv
		}
	})

	afterAll(() => {
		process.env = OldEnv
	})

	it('Should return debug level on development env', () => {
		process.env.NODE_ENV = 'development'

		const level = getBaseLevel()

		expect(level).toBe('debug')
	})

	it('Should return debug level on debug env', () => {
		process.env.NODE_ENV = 'debug'

		const level = getBaseLevel()

		expect(level).toBe('debug')
	})

	it('Should return http level on production env', () => {
		process.env.NODE_ENV = 'production'

		const level = getBaseLevel()

		expect(level).toBe('http')
	})
})
