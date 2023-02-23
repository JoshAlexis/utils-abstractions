import helmet from 'helmet'

/**
 * Configuración default de `helmet` junto con:
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
