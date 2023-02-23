import { NextFunction, Request, Response } from 'express'
import { allowedOrigins } from './corsOptions'

/**
 * Añade la cabecera de `Access-Control-Allow-Credentials`.
 */
export function credentialsHeader(req: Request, res: Response, next: NextFunction) {
	const { origin } = req.headers
	if (allowedOrigins?.includes(origin as string) || !origin) {
		res.header('Access-Control-Allow-Credentials', 'true')
	}
	next()
}
