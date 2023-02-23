/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Oculta la información un campo de un objeto. Si no es objeto retorna el valor ingresado
 * @param obj
 */
export function hideField(obj: unknown): unknown {
	if (typeof obj === 'object' && obj !== null) {
		let newObj = {}

		Object.entries(obj).forEach((item) => {
			// @ts-ignore
			if (Object.hasOwn(obj, 'cookie') && obj?.cookie?.includes('jwt')) {
				const hiddenValue = 'jwt=*****************'
				newObj = {
					...obj,
					...newObj,
					cookie: hiddenValue
				}
			}
			if (Object.hasOwn(obj, 'authorization')) {
				const hiddenValue = 'Bearer *****************'
				newObj = {
					...obj,
					...newObj,
					authorization: hiddenValue
				}
			}
			if (Object.hasOwn(obj, 'password')) {
				const hiddenValue = '*****************'
				newObj = {
					...obj,
					...newObj,
					password: hiddenValue
				}
			}
		})
		return newObj
	}
	return obj
}
