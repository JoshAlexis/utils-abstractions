import { hideField } from '../../src/middlewares/hideField'

describe('hideField', () => {
	it('Should return and empty object when the value is an empty object', () => {
		const data = {}

		const result = hideField(data)

		expect(result).toEqual(data)
	})

	it('Should hide value of Authorization field', () => {
		const data = {
			authorization: 'Bearer token'
		}

		const result = hideField(data) as { authorization: string }

		expect(result.authorization).toMatch(/\*+$/)
	})

	it('Should hide value of Cookie jwt field', () => {
		const data = {
			cookie: {
				jwt: 'token'
			}
		}

		const result = hideField(data)

		expect(result.cookie).toBeDefined()
		expect((result.cookie as Record<string, string>).jwt).toBe('********************')
	})
})
