import { CorsOptions } from 'cors'

export const allowedOrigins = process.env.CORS_ORIGINS?.split(',')

/**
 * Define las opciones para CORS.
 */
export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true)
		if (allowedOrigins?.includes(origin)) return callback(null, true)
		return callback(new Error('No allowed by CORS'))
	}
}
