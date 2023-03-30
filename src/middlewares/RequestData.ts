/**
 * Define the fields to capture from the requests.
 */
export interface RequestDataValues {
	body: string
	headers: string
	params: string
	query: string
	files: unknown | undefined
	url: unknown | undefined
	method: unknown | undefined
}

/**
 * Stores information of the requests.
 */
export const RequestData: RequestDataValues = {
	body: '',
	headers: '',
	params: '',
	query: '',
	files: '',
	url: undefined,
	method: undefined
}
