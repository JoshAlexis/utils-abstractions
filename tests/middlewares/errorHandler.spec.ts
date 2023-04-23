import { mockClear, mockDeep } from 'jest-mock-extended'
import createError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../../src/middlewares'

describe('errorHandler', () => {
	const request = mockDeep<Request>()
	const response = mockDeep<Response>()
	const next = mockDeep<NextFunction>()

	beforeAll(() => {
		response.status.mockReturnValue(response)
		response.json.mockReturnValue(response)
	})

	beforeEach(() => {
		mockClear(response)
	})

	it('Should return an error response with status code 500', () => {
		const err = new Error('Internal Server Error')

		errorHandler(err, request, response, next)

		expect(response.status).toHaveBeenCalledTimes(1)
		expect(response.json).toHaveBeenCalledTimes(1)
		expect(response.json).toHaveBeenCalledWith({
			status: 500,
			message: 'Internal Server Error'
		})
	})

	it('Should return an error response with status code 404', () => {
		const err = createError.NotFound('Item Not Found')

		errorHandler(err, request, response, next)

		expect(response.status).toHaveBeenCalledTimes(1)
		expect(response.json).toHaveBeenCalledTimes(1)
		expect(response.json).toHaveBeenCalledWith({
			status: 404,
			message: 'Item Not Found'
		})
	})
})
