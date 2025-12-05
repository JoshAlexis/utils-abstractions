const fieldSetsCache = {
	fieldsToRemove: null as Set<string> | null,
	cookiesToRemove: null as Set<string> | null
}

function getFieldSets() {
	if (!fieldSetsCache.fieldsToRemove) {
		const fieldsToRemove = process.env.FIELDS_TO_REMOVE?.split(',') ?? ['authorization']
		const cookiesToRemove = process.env.COOKIES_TO_REMOVE?.split(',') ?? ['jwt']
		fieldSetsCache.fieldsToRemove = new Set(fieldsToRemove)
		fieldSetsCache.cookiesToRemove = new Set(cookiesToRemove)
	}
	return {
		fieldsToRemove: fieldSetsCache.fieldsToRemove,
		cookiesToRemove: fieldSetsCache.cookiesToRemove!
	}
}

function parseCookieString(cookieString: string): Record<string, string> {
	const cookies: Record<string, string> = {}

	try {
		cookieString.split(';').forEach((cookie) => {
			const [name, value] = cookie.trim().split('=')
			if (name && value) {
				cookies[name] = value
			}
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		// Si hay error parseando, retornar objeto vacío
		return {}
	}

	return cookies
}

export type HideFieldParams = Record<string, string | Record<string, string>>

function removeFromCookie(cookieData: Record<string, string>, keys: Set<string>) {
	return Object.keys(cookieData).reduce((acc: Record<string, string>, key) => {
		if (keys.has(key)) {
			acc[key] = '********************'
		} else {
			acc[key] = cookieData[key]
		}
		return acc
	}, {})
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Oculta la información un campo de un objeto. Si no es objeto retorna el valor ingresado
 * @param obj
 */
export function hideField(obj: HideFieldParams): HideFieldParams {
	// Validación de entrada
	if (!obj || typeof obj !== 'object') {
		return obj
	}

	const { fieldsToRemove, cookiesToRemove } = getFieldSets()
	const cloneObj = structuredClone(obj)

	return Object.keys(cloneObj).reduce((acc: HideFieldParams, key) => {
		const value = cloneObj[key]

		if (fieldsToRemove.has(key)) {
			acc[key] = '********************'
		} else if (key.toLowerCase() === 'cookie') {
			// Manejar tanto strings como objetos
			if (typeof value === 'string') {
				const cookieData = parseCookieString(value)
				acc[key] = removeFromCookie(cookieData, cookiesToRemove)
			} else if (value && typeof value === 'object') {
				acc[key] = removeFromCookie(value as Record<string, string>, cookiesToRemove)
			} else {
				acc[key] = value
			}
		} else {
			acc[key] = value
		}
		return acc
	}, {})
}
