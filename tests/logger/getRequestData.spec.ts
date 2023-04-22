import { BaseMetadataFields } from '../../src/logger/abstractions'
import { getRequestData } from '../../src/logger/getRequestData'
import { RequestData } from '../../src/middlewares/RequestData'

describe('getRequestData', () => {
	it('Should no reassign/mutate the original metadata object', () => {
		RequestData.url = '/users/1'
		RequestData.method = 'GET'

		const metadata: BaseMetadataFields = {
			domain: 'Logger',
			layer: 'None',
			context: 'getRequestData'
		}

		const result = getRequestData(metadata)

		expect(result).toHaveProperty('url', '/users/1')
		expect(result).toHaveProperty('method', 'GET')
		expect(metadata).not.toHaveProperty('url')
		expect(metadata).not.toHaveProperty('method')
	})

	it('Should reassign/mutate the original metadata object', () => {
		RequestData.url = '/users/1'
		RequestData.method = 'GET'

		const metadata: BaseMetadataFields = {
			domain: 'Logger',
			layer: 'None',
			context: 'getRequestData'
		}

		const result = getRequestData(metadata, true)

		expect(result).toHaveProperty('url', '/users/1')
		expect(result).toHaveProperty('method', 'GET')
		expect(metadata).toHaveProperty('url')
		expect(metadata).toHaveProperty('method')
	})
})
