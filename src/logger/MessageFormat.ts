import winston from 'winston'

export type MessageFormat = winston.Logform.TransformableInfo & {
	labels?: Record<string, string>
	domain?: string
	layer?: string
	context?: string
}
