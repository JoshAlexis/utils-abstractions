import { hideField } from '../../src/middlewares/hideField'

describe('hideField', () => {
	it('Should return and empty object when the value is an empty object', () => {
		const data = {}

		const result = hideField(data)

		expect(result).toEqual(data)
	})

	it('Should hide value of password field', () => {
		const data = {
			password: 'my-password'
		}

		const result = hideField(data) as { password: string }

		expect(result.password).toMatch(/^\*+$/)
	})

	it('Should hide value of Authorization field', () => {
		const data = {
			authorization: 'Bearer token'
		}

		const result = hideField(data) as { authorization: string }

		expect(result.authorization).toMatch(/\*+$/)
	})
})
