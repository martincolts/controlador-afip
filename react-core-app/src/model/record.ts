export type AFIPRecordRow = {
    date: string
    type: string
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
    impNoExenras: number
    iva: number
    total: number
    fileType: string
}

const ParseToRow = (data: any[]): AFIPRecordRow => {
    return {
        date: data[0],
        type: data[1],
        sellPoint: data[2],
        numberFrom: data[3],
        numberTo: data[4],
        authCod: data[5],
        typeReceptorCode: data[6],
        docReceptor: data[7],
        receptorDenomination: data[8],
        changeType: data[9],
        currency: data[10],
        taxNet: parseFloat(data[11]),
        noTaxNet: parseFloat(data[12]),
        impNoExenras: parseFloat(data[13]),
        iva: parseFloat(data[14]),
        total: parseFloat(data[15]),
    } as AFIPRecordRow;
}


export {
    ParseToRow as ParseToData
}