const { actions } = require('./actions')

class EventController {
    constructor(recordService, clientService) {
        this.recordService = recordService
        this.clientService = clientService
    }

    async processMessage({action, payload}) {
        switch (action) {
            case actions.CREATE_RECORD:
                return await this.recordService.createRecord(payload)
            case actions.CREATE_RECORDS:
                for (const record of payload) {
                    return await this.recordService.createRecord(record)
                }
                break
            case actions.FILTER_RECORDS_BY_CLIENT_CUIT:
                return await this.recordService.selectById(payload.clientCuit)
            case actions.CREATE_CLIENT:
                return await this.clientService.insertClient(payload)
            case actions.LIST_CLIENTS:
                return await this.clientService.listClients()
        }
    }
}

module.exports = {
    EventController
}