/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Oculta la información un campo de un objeto. Si no es objeto retorna el valor ingresado
 * @param obj
 */
export function hideField(obj: unknown): unknown {
	if (typeof obj === 'object' && obj !== null) {
		let newObj = obj

		Object.keys(obj).forEach((key) => {
			// @ts-ignore
			if (key.toLowerCase() === 'cookie' && obj?.cookie?.includes('jwt')) {
				const hiddenValue = 'jwt=*****************'
				newObj = {
					...newObj,
					cookie: hiddenValue
				}
			}
			if (key.toLowerCase() === 'authorization') {
				const hiddenValue = 'Bearer *****************'
				newObj = {
					...newObj,
					authorization: hiddenValue
				}
			}
			if (key.toLowerCase() === 'password') {
				const hiddenValue = '*****************'
				newObj = {
					...newObj,
					password: hiddenValue
				}
			}
		})
		return newObj
	}
	return obj
}
