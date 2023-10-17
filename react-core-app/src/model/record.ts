export type AFIPRecordRow = {
    id?: number
    composedId?: string
    clientCuit? :string
    date: string
    receiptType: string
    sellPoint: string
    numberFrom: string
    numberTo: string
    authCod: string
    typeReceptorCode: string
    docReceptor: string
    receptorDenomination: string
    changeType: string
    currency: string
    taxNet: number
    noTaxNet: number
    impOpExentas: number
    iva: number
    total: number
    fileType: string,
    recordDate?: Date,
    recordStringDate?: string, // format YYYY-MM-DD
    correct?: boolean; // true was inserted correctly / false it was not inserted correctly
    index?: number;
}

const ParseToData = (data: any[]): AFIPRecordRow => {
    return {
        date: correctDate(data[0]),
        receiptType: data[1],
        sellPoint: data[2],
        numberFrom: data[3],
        numberTo: data[4],
        authCod: data[5],
        typeReceptorCode: data[6],
        docReceptor: data[7],
        receptorDenomination: data[8],
        changeType: data[9],
        currency: data[10],
        taxNet: parseFloat(data[11]) || 0.0,
        noTaxNet: parseFloat(data[12]) || 0.0,
        impOpExentas: parseFloat(data[13]) || 0.0, // otros tributos es [14]
        iva: parseFloat(data[15]) || 0.0,
        total: parseFloat(data[16]) || 0.0,
    } as AFIPRecordRow;
}

const MapFromService = (row: any): AFIPRecordRow => {
    return {
        authCod: row.auth_code,
        changeType: row.change_type,
        clientCuit: row.client_cuit,
        composedId: row.composed_id,
        currency: row.currency,
        docReceptor: row.doc_receptor,
        id: row.id,
        taxNet: row.imp_neto_grabado,
        noTaxNet: row.imp_neto_no_grabado,
        impOpExentas: row.imp_op_exentas,
        iva: row.iva,
        numberFrom: row.number_from,
        numberTo: row.number_to,
        receiptType: row.receipt_from,
        receptorDenomination: row.receptor_denomination,
        recordDate: formatDate(row.record_date),
        sellPoint: row.sell_point,
        total: row.total_amount,
        typeReceptorCode: row.type_receptorCode,
        fileType: row.type,
        recordStringDate: formatMonth(row.record_date),
    } as AFIPRecordRow
}

const formatDate = (stringDate: string): Date => {
    return new Date(stringDate)
}

const formatMonth = (stringDate: string): string => {
    const extracted = stringDate.split('-')
    return `${extracted[0]}-${extracted[1]}`
}

const correctDate = (stringDate: string): string => {
    const extracted = stringDate.split('-')
    return `${extracted[2]}-${extracted[1]}-${extracted[0]}`
}

export {
    ParseToData,
    MapFromService
}