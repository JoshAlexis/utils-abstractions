import { ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Algorithm } from 'jsonwebtoken'

/**
 * Default configurations for `passport-jwt` with:
 *
 * - Extract token from Authorization Header (Bearer)
 * - Issuer
 * - Algorithms
 *
 * Requires the env `JWT_ACCESS_SECRET`, `JWT_ISSUER` and `JWT_ALGORITHM`
 */
export const JWT_STRATEGY_OPTIONS: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env?.JWT_ACCESS_SECRET as string,
	issuer: process.env?.JWT_ISSUER,
	algorithms: [process.env?.JWT_ALGORITHM as Algorithm]
}
