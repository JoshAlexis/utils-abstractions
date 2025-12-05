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

	it('Should hide value of header from ENV', () => {
		const data = {
			authorization: 'Bearer token',
			'x-custom-header': 'custom-value'
		}

		const result = hideField(data)

		expect(result.authorization).toBe('********************')
		expect(result['x-custom-header']).toBe('********************')
	})

	it('Should hide value of cookie from ENV', () => {
		const data = {
			cookie: {
				jwt: 'token',
				'session-id': 'custom-value'
			}
		}

		const result = hideField(data)

		expect((result.cookie as Record<string, string>).jwt).toBe('********************')
		expect((result.cookie as Record<string, string>)['session-id']).toBe('********************')
	})
})
