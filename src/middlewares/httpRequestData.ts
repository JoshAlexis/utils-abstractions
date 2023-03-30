import { Request, Response, NextFunction } from 'express'
import { hideField } from './hideField'
import { RequestData } from './RequestData'
import { BaseLogger } from '../logger/abstractions/BaseLogger'

/**
 * Fetch data from the request and keep it in memory. Works together a logger, and it takes the values of:
 *
 * - *body*
 * - *params*
 * - *query*
 * - *headers*
 * - *url*
 * - *method*
 * @group Middlewares
 */
export function httpRequestData(logger: BaseLogger) {
	return (req: Request, res: Response, next: NextFunction) => {
		const metadata = {
			method: req.method,
			url: req.url,
			body: hideField(req.body),
			params: req.params,
			query: req.query,
			headers: hideField(req.headers)
		}

		RequestData.body = JSON.stringify(hideField(req.body))
		RequestData.headers = JSON.stringify(hideField(req.headers))
		RequestData.params = JSON.stringify(req.params)
		RequestData.query = JSON.stringify(req.query)
		RequestData.url = req.url
		RequestData.method = req.method

		logger.http('Request {method} to {url}', metadata)
		next()
	}
}
