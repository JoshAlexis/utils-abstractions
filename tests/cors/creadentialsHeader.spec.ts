import { mockDeep } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { credentialsHeader } from '../../src/cors'

describe('credentialsHeader', () => {
	const request = mockDeep<Request>()
	const response = mockDeep<Response>()
	const next = jest.fn()
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

	it('Should add header when the origin is in the allowed list', () => {
		process.env.CORS_ORIGINS = 'https://frontend.app'
		response.getHeader.mockReturnValue('true')

		request.headers = {
			origin: 'https://frontend.app'
		}

		credentialsHeader(request, response, next)
		expect(response.getHeader('Access-Control-Allow-Credentials')).toMatch('true')
	})
})
