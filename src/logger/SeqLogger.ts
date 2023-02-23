import { SeqTransport } from '@datalust/winston-seq'
import winston from 'winston'
import { BaseLogger } from './abstractions/BaseLogger'
import { getBaseLevel } from './config/getBaseLevel'
import { LOGGER_LEVELS } from './config/LoggerLevels'

/**
 * Instancia de `Winston` con configuración de `transport` usando `Seq`.
 * Depende de las variables `SEQ_SERVER` y `SEQ_TOKEN`.
 */
export class SeqLogger implements BaseLogger {
	private seq: winston.Logger

	private readonly seqTemplateMessage = '[{domain}.{layer}.{context}]'

	constructor() {
		this.seq = winston.createLogger({
			level: getBaseLevel(),
			levels: LOGGER_LEVELS,
			format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
			transports: [
				new SeqTransport({
					serverUrl: process.env.SEQ_SERVER || 'http://localhost:5341',
					apiKey: process.env.SEQ_TOKEN,
					onError: (e) => {
						console.log(e.message)
					},
					handleExceptions: true,
					handleRejections: true
				})
			]
		})
	}

	debug(message: string, meta?: any): void {
		this.seq.debug(`${this.seqTemplateMessage} ${message}`, meta)
	}

	error(message: string, meta?: any): void {
		this.seq.error(`${this.seqTemplateMessage} ${message}`, meta)
	}

	http(message: string, meta?: any): void {
		if (Object.hasOwn(meta, 'status') || Object.hasOwn(meta, 'response_time'))
			this.seq.http('HTTP {method} {url} responded {status} in {response_time} ms', meta)
		if (message.startsWith('Request')) this.seq.http(message, meta)
	}

	info(message: string, meta?: any): void {
		this.seq.info(`${this.seqTemplateMessage} ${message}`, meta)
	}

	warn(message: string, meta?: any): void {
		this.seq.warn(`${this.seqTemplateMessage} ${message}`, meta)
	}
}
