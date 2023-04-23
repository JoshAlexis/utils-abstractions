import { showDebugQuery } from '../../src/logger'

describe('showDebugQuery', () => {
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

	it('Should return a query when the env SHOW_QUERY is set to show', () => {
		process.env.SHOW_QUERY = 'show'

		const result = showDebugQuery('Fetching users', 'SELECT * FROM users')

		expect(result).toMatch('Fetching users. Query: SELECT * FROM users')
	})

	it('Should return only the message when the env SHOW_QUERY is different from show', () => {
		process.env.SHOW_QUERY = 'show'

		const result = showDebugQuery('Fetching users', 'SELECT * FROM users')

		expect(result).toMatch('Fetching users')
	})
})
