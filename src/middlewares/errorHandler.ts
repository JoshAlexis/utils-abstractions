import { NextFunction, Request, Response } from 'express'

/**
 * Middleware for general error handling.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	res.status(err.status || 500).json({
		status: err.status || 500,
		message: err.message
	})
}
