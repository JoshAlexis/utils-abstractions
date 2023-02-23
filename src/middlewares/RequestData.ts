/**
 * Define los campos a obtener de las peticiones.
 *
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
 * Almacena la información de las peticiones.
 *
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
