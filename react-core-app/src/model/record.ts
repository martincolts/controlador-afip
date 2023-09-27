export type AFIPRecordRow = {
    clientCuit? :string,
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
    fileType: string
}

const ParseToRow = (data: any[]): AFIPRecordRow => {
    return {
        date: data[0],
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
        impOpExentas: parseFloat(data[13]) || 0.0,
        iva: parseFloat(data[14]) || 0.0,
        total: parseFloat(data[15]) || 0.0,
    } as AFIPRecordRow;
}


export {
    ParseToRow as ParseToData
}