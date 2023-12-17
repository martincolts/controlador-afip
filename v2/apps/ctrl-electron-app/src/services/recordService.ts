import { AFIPRecordRow } from "@v2/model"
import { DBRepository } from "../db"

let regex = /\d{2,}/g

type SelectByDatesParams = {
    dateFrom: string
    dateTo: string
    cuit: string
}

class RecordService {
    constructor(private dbRepository: DBRepository) {
        this.dbRepository = dbRepository
    }

    async insertRecord(record: AFIPRecordRow) {
        record.composedId = `${record.clientCuit}_${record.date}_${record.sellPoint}_${record.numberFrom}_${record.numberTo}_${record.authCod}_${record.fileType}`
        const decoded = record.date.match(regex)
        record.date = `${decoded[2]}-${decoded[1]}-${decoded[0]}`
        return await this.dbRepository.insertRecord(record)
    }

    async insertRecords(records: AFIPRecordRow[]) {
        const recordsWithErrors = []
        for (const record of records) {
            try {
                await this.insertRecord(record)
            } catch (e) {
                console.log('erro entonces tiene q agregar el index al array', e)
                recordsWithErrors.push(record.index)
            }
        }
        return recordsWithErrors
    }

    async deleteRecordsByClientCuit(clientCuit: string): Promise<boolean> {
        return await this.dbRepository.deleteRecordsByClientCuit(clientCuit)
    }

    async selectById(id: string) {
        return await this.dbRepository.selectRecordById(id)
    }

    async selectByComposedId(composedId: string) {
        return await this.dbRepository.selectRecordByComposedId(composedId)
    }

    async selectByDates(dateFrom: string, dateTo: string) {
        return await this.dbRepository.selectRecordsBetweenDates(dateFrom, dateTo)
    }

    async selectGastosByDates(params: SelectByDatesParams) {
        const { dateFrom, dateTo, cuit } = params
        return await this.dbRepository.selectGastosBetweenDates(dateFrom, dateTo, cuit)
    }

    async selectVentasByDates(params: SelectByDatesParams) {
        const { dateFrom, dateTo, cuit } = params
        return await this.dbRepository.selectVentasBetweenDates(dateFrom, dateTo, cuit)
    }

    async selectByClientCuit(clientCuit: string) {
        return await this.dbRepository.selectRecordsByClientCuit(clientCuit)
    }


}

export {
    RecordService
}