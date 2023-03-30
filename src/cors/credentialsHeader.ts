import { NextFunction, Request, Response } from 'express'
import { allowedOrigins } from './corsOptions'

/**
 * Sets the header `Access-Control-Allow-Credentials` to the request based on the `CORS_ORIGINS`.
 */
export function credentialsHeader(req: Request, res: Response, next: NextFunction) {
	const { origin } = req.headers
	if (allowedOrigins?.includes(origin as string) || !origin) {
		res.header('Access-Control-Allow-Credentials', 'true')
	}
	next()
}
