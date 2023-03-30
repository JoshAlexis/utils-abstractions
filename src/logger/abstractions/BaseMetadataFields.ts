/**
 * Define the base fields for logging's metadata. All the new definitions must
 * extend this interface.
 *
 * The structure of the log messages is the next:
 *
 * @example
 * ```shell
 * [2023-03-30 12:16:16.0761 PM] [log-level] [domain.layer.context]: Database connected
 * ```
 */
export interface BaseMetadataFields extends Record<string, string | number | unknown> {
	/**
	 * The domain of the element, for an initial understanding it can be said that it is a submodule.
	 */
	domain?: string
	/**
	 * Architecture's layer
	 */
	layer?: 'Application' | 'Infrastructure' | 'Presentation' | 'None' | string
	/**
	 * The point inside a function/class/method
	 */
	context?: string
}
