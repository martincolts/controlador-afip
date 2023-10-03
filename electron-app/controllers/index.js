const { actions } = require('./actions')

class EventController {
    constructor(recordService, clientService) {
        this.recordService = recordService
        this.clientService = clientService
    }

    async processMessage({action, payload}) {
        switch (action) {
            case actions.CREATE_RECORD:
                return await this.recordService.insertRecord(payload)
            case actions.CREATE_RECORDS:
                for (const record of payload) {
                    await this.recordService.insertRecord(record)
                }
                return true
            case actions.FILTER_RECORDS_BY_CLIENT_CUIT:
                return await this.recordService.selectById(payload.clientCuit)
            case actions.CREATE_CLIENT:
                return await this.clientService.insertClient(payload)
            case actions.LIST_CLIENTS:
                return await this.clientService.listClients()
            case actions.LIST_GASTOS_BY_DATES:
                return await this.recordService.selectGastosByDates(payload)
            case actions.LIST_VENTAS_BY_DATES:
                return await this.recordService.selectVentasByDates(payload)

        }

        
    }
}

module.exports = {
    EventController
}