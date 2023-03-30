import { CorsOptions } from 'cors'

export const allowedOrigins = process.env.CORS_ORIGINS?.split(',')

/**
 * Defines a configuration for allowed origins. The list of origins comes from then env `CORS_ORIGINS` in a single
 * string separated by commas.
 */
export const corsOptions: CorsOptions = {
	// eslint-disable-next-line no-shadow
	origin: (origin: string | undefined, callback: (err: Error | null, origin?: any | undefined) => void) => {
		if (!origin) return callback(null, true)
		if (allowedOrigins?.includes(origin)) return callback(null, true)
		return callback(new Error('No allowed by CORS'))
	}
}
