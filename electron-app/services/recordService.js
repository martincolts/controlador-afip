class RecordService {
    constructor(dbService) {
        this.dbService = dbService
    }

    async insertRecord(record) {
        return await this.dbService.insertRecord(record)
    }

    async selectById(id) {
        return await this.dbService.selectRecordById(id)
    }

    async selectByComposedId(composedId) {
        return await this.dbService.selectRecordByComposedId(composedId)
    }

    async selectByDates(dateFrom, dateTo) {
        return await this.dbService.selectRecordsBetweenDates(dateFrom, dateTo)
    }

    async selectByClientCuit(clientCuit) {
        return await this.dbService.selectRecordsByClientCuit(clientCuit)
    }


}

module.exports = {
    RecordService
}