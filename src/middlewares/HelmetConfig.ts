import helmet from 'helmet'

/**
 * The *Helmet* middleware with custom options for:
 *
 * - hidePoweredBy
 * - dnsPrefetchControl
 * - frameguard
 * - noSniff
 * - xssFilter
 */
export const HelmetConfig = helmet({
	hidePoweredBy: true,
	dnsPrefetchControl: {
		allow: true
	},
	frameguard: {
		action: 'deny'
	},
	noSniff: true,
	xssFilter: true
})
