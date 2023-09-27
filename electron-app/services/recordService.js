class RecordService {
    constructor(dbRepository) {
        this.dbRepository = dbRepository
    }

    async insertRecord(record) {
        record.composedId = `${record.clientCuit}_${record.date}_${record.sellPoint}_${record.numberFrom}_${record.numberTo}_${record.authCod}_${record.fileType}`
        return await this.dbRepository.insertRecord(record)
    }

    async selectById(id) {
        return await this.dbRepository.selectRecordById(id)
    }

    async selectByComposedId(composedId) {
        return await this.dbRepository.selectRecordByComposedId(composedId)
    }

    async selectByDates(dateFrom, dateTo) {
        return await this.dbRepository.selectRecordsBetweenDates(dateFrom, dateTo)
    }

    async selectByClientCuit(clientCuit) {
        return await this.dbRepository.selectRecordsByClientCuit(clientCuit)
    }


}

module.exports = {
    RecordService
}