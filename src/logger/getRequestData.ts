import { BaseMetadataFields } from './abstractions'
import { RequestData } from '../middlewares/RequestData'

/**
 * Adds information about the request in the metadata. Sets the fields:
 *
 * - url
 * - method
 * @param metadata
 */
export function getRequestData(metadata: BaseMetadataFields): BaseMetadataFields {
	return {
		...metadata,
		url: RequestData.url,
		method: RequestData.method
	}
}
