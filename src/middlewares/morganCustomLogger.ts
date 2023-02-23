import morgan from 'morgan'
import { RequestData } from './RequestData'
import { BaseLogger } from '../logger/abstractions'
/**
 * Añade el `logger` personalizado a `Morgan`
 * @param logger El `logger`
 */
export function morganCustomLogger(logger: BaseLogger) {
	const stream: morgan.StreamOptions = {
		write: (message: string) => {
			const messageSplitted = message.split(' ')

			const metadata = {
				method: messageSplitted[0],
				url: messageSplitted[1],
				status: messageSplitted[2],
				content_length: messageSplitted[3],
				response_time: messageSplitted[4],
				request_body: RequestData.body,
				request_headers: RequestData.headers,
				request_query: RequestData.query,
				request_params: RequestData.params
			}

			logger.http(message.trim(), metadata)
		}
	}

	return morgan(':method :url :status :res[content-length] :response-time ms', { stream })
}
