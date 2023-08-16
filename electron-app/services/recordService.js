class RecordService {
    constructor(dbService) {
        this.dbService = dbService
    }

    async insertRecord(record) {
        return await this.dbService.insertRecord(record)
    }

    async selectById(id) {
        return await this.dbService.selectById(id)
    }

    async selectByComposedId(composedId) {
        return await this.dbService.selectByComposedId(composedId)
    }

    async selectByDates(dateFrom, dateTo) {
        return await this.dbService.selectByDates(dateFrom, dateTo)
    }

    async selectByClientCuit(clientCuit) {
        return await this.dbService.selectByClientCuit(clientCuit)
    }


}

module.exports = {
    RecordService
}