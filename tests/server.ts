import 'reflect-metadata'
import express from 'express'
import { BaseMetadataFields } from '../src/logger/abstractions/BaseMetadataFields'
import { LoggerContainer } from '../src/logger/LoggerContainer'
import { LokiLogger } from '../src/logger/LokiLogger'
import { WinstonLogger } from '../src/logger/WinstonLogger'
import { httpRequestData } from '../src/middlewares/httpRequestData'
import { morganCustomLogger } from '../src/middlewares/morganCustomLogger'

const logger = new LoggerContainer()

logger.addLogger('loki', new LokiLogger())
logger.addLogger('winston', new WinstonLogger())

const loki = logger.getLogger('loki')

const app = express()

app.use(express.json())

app.use(httpRequestData(loki))
app.use(morganCustomLogger(logger))

app.post('/logging', (req, res) => {
	logger.debug('Call on logging', { domain: 'App', layer: 'None', point: 'app.post' } as BaseMetadataFields)
	res.status(200).json({ message: 'OK' })
})

app.listen(3001, () => {
	logger.debug('Server listening on port 3001', {
		domain: 'App',
		layer: 'None',
		point: 'app.listen'
	} as BaseMetadataFields)
})
