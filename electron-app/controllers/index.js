const { actions } = require('./actions')

class EventController {
    constructor(recordService) {
        this.recordService = recordService
    }

    async processMessage({action, payload}) {
        switch (action) {
            case actions.CREATE_RECORD:
                await this.recordService.createRecord(payload)
                break
            case actions.CREATE_RECORDS:
                for (const record of payload) {
                    await this.recordService.createRecord(record)
                }
                break
            case actions.FILTER_RECORDS_BY_CLIENT_CUIT:
                await this.recordService.selectById(payload.clientCuit)
        }
    }
}

module.exports = {
    EventController
}