import { mockDeep } from 'jest-mock-extended'
import { messageFormat } from '../../../src/logger/config/messageFormat'
import { MessageFormat } from '../../../src/logger/MessageFormat'

describe('messageFormat', () => {
	const logInfo = mockDeep<MessageFormat>()
	it('Should generate message with metadata', () => {
		logInfo.level = 'DEBUG'
		logInfo.message = 'calling async handler'
		logInfo.timestamp = '2023-03-30 12:16:16.0761 PM'
		logInfo.domain = 'MessageService'
		logInfo.layer = 'Infrastructure'
		logInfo.context = 'sendMessage'

		const message = `[${logInfo.timestamp}] [${logInfo.level}] [${logInfo.domain}.${logInfo.layer}.${logInfo.context}]: ${logInfo.message}`

		const result = messageFormat(logInfo)

		expect(result).toEqual(message)
	})

	it('Should generate message without metadata', () => {
		logInfo.level = 'DEBUG'
		logInfo.message = 'calling async handler'
		logInfo.timestamp = '2023-03-30 12:16:16.0761 PM'
		logInfo.domain = undefined

		const message = `[${logInfo.timestamp}] [${logInfo.level}] ${logInfo.message}`

		const result = messageFormat(logInfo)

		expect(result).toEqual(message)
	})
})
