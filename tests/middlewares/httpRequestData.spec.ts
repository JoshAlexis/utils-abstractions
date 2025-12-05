import { mockDeep } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { BaseLogger } from '../../src/logger/abstractions'
import { httpRequestData } from '../../src/middlewares'
import { RequestData } from '../../src/middlewares/RequestData'
import { hideField, HideFieldParams } from '../../src/middlewares/hideField'

describe('httpRequestData', () => {
	const logger = mockDeep<BaseLogger>()
	const request = mockDeep<Request>()
	const response = mockDeep<Response>()
	const next = jest.fn()

	afterAll(() => {
		RequestData.body = ''
		RequestData.headers = ''
		RequestData.params = ''
		RequestData.query = ''
		RequestData.files = ''
		RequestData.url = undefined
		RequestData.method = undefined
	})

	it('Should load request data object', () => {
		request.url = '/users/1'
		request.method = 'GET'
		request.body = {
			user: 'username',
			password: 'my-password'
		}
		request.params = {}
		request.query = {
			page: '1',
			offset: '0'
		}
		request.headers = {
			Authorization: 'Bearer token',
			Cookie: 'token=123456789'
		}
		httpRequestData(logger)(request, response, next)

		expect(next).toHaveBeenCalledTimes(1)
		expect(RequestData.url).toEqual(request.url)
		expect(RequestData.method).toEqual(request.method)
		expect(RequestData.body).toEqual('')
		expect(RequestData.params).toEqual(JSON.stringify(request.params))
		expect(RequestData.query).toEqual(JSON.stringify(request.query))
		expect(RequestData.headers).toEqual(JSON.stringify(hideField(request.headers as HideFieldParams)))
	})
})
