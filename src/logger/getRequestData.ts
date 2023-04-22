import { BaseMetadataFields } from './abstractions'
import { RequestData } from '../middlewares/RequestData'

/**
 * Adds information about the request in the metadata. Sets the fields:
 *
 * - url
 * - method
 * @param metadata
 * @param reassign If true assigns the values in the object directly instead of create a copy.
 * Default to false.
 */
export function getRequestData(metadata: BaseMetadataFields, reassign = false): BaseMetadataFields {
	if (reassign) {
		// eslint-disable-next-line no-param-reassign
		metadata.url = RequestData.url
		// eslint-disable-next-line no-param-reassign
		metadata.method = RequestData.method
		return metadata
	}
	return {
		...metadata,
		url: RequestData.url,
		method: RequestData.method
	}
}
