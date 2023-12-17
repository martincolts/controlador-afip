import { actions } from '@v2/model'
import { RecordService } from '../services/recordService'
import { ClientService } from '../services/clientService'

class EventController {
    constructor(private recordService: RecordService, private clientService: ClientService) {
        this.recordService = recordService
        this.clientService = clientService
    }
    async processMessage({ action, payload }) {
        console.log({action, payload})
        switch (action) {
            case actions.CREATE_RECORD:
                return await this.recordService.insertRecord(payload)
            case actions.CREATE_RECORDS:
                return await this.recordService.insertRecords(payload)
            case actions.DELETE_RECORDS_BY_CLIENT:
                return await this.recordService.deleteRecordsByClientCuit(payload.clientCuit)
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

export {
    EventController
}