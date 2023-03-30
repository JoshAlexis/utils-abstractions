import { BaseError } from 'sequelize'

/**
 * List of `Sequelize` error names.
 */
export const SequelizeError = [
	'DatabaseError',
	'AggregateError',
	'ValidationError',
	'AssociationError',
	'BulkRecordError',
	'ConnectionError',
	'EagerLoadingError',
	'EmptyResultError',
	'InstanceError',
	'OptimisticLockError',
	'QueryError',
	'SequelizeScopeError',
	// Connection
	'ConnectionTimeOutError',
	'AccessDeniedError',
	'ConnectionAcquiredTimeoutError',
	'ConnectionRefusedError',
	'HostNotFoundError',
	'HostNotReachableError',
	'InvalidConnectionError',
	// Database
	'ExclusionConstraintError',
	'TimeoutError',
	'UnknownConstraintError',
	'ForeignKeyConstraintError',
	'UniqueConstraintError'
]

/**
 * Verifies if an error is from `Sequelize`.
 * @param error Error to verify
 *
 */
export function isSequelizeError(error: unknown): error is BaseError {
	return SequelizeError.includes((error as Error).name)
}
