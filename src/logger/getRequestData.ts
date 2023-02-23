import { BaseMetadataFields } from './abstractions'
import { RequestData } from '../middlewares/RequestData'

/**
 * Añade información de la petición a los metadatos.
 * @param metadata
 */
export function getRequestData(metadata: BaseMetadataFields): BaseMetadataFields {
	return {
		...metadata,
		url: RequestData.url,
		method: RequestData.method
	}
}
