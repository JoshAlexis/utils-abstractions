import { ExtractJwt, StrategyOptions } from 'passport-jwt'

/**
 * Configuraciones para `Strategy` de `JWT`.
 */
export const JWT_STRATEGY_OPTIONS: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env?.JWT_ACCESS_SECRET,
	issuer: process.env?.JWT_ISSUER,
	algorithms: [process.env?.JWT_ALGORITHM as string]
}
