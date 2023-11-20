export interface AFIPRecordRow {
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
    const receiptType = data[1]
    return {
        date: correctDate(data[0]),
        receiptType,
        sellPoint: data[2],
        numberFrom: data[3],
        numberTo: data[4],
        authCod: data[5],
        typeReceptorCode: data[6],
        docReceptor: data[7],
        receptorDenomination: data[8],
        changeType: data[9],
        currency: data[10],
        taxNet: parseImporte(data[11], receiptType),
        noTaxNet: parseImporte(data[12], receiptType),
        impOpExentas: parseImporte(data[13], receiptType) || 0.0, // otros tributos es [14]
        iva: parseImporte(data[15], receiptType),
        total: parseImporte(data[16], receiptType),
    } as AFIPRecordRow;
}

const parseImporte = (importe: string, receiptType: string): number => {
    const float = parseFloat(importe.replace(',', '.')) || 0.0
    return isNotaDeCredito(receiptType) ? -1 * float : float
}

const MapFromRaw = (row: any): AFIPRecordRow => {
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

const MapFromRaws = (rows: any[]): AFIPRecordRow[] => {
    return rows.map(r => MapFromRaw(r))
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

const codes = ["2","3","7","8","12","13","20","21","37","38","52","53"]

const isNotaDeCredito = (code: string) => {
    return codes.includes(code)
}

export {
    ParseToData,
    MapFromRaw,
    MapFromRaws
}