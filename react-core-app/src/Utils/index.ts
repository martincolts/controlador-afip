import Papa, { ParseResult } from "papaparse"
import { ParseToData, Row } from "../model/row";


export function currencyFormat(num: number) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


const loadingFilesHandler = (event: any): Promise<Row[]> => {
  return new Promise(async (resolve, reject) => {
    let valuesArray: Row[] = [];
    const files = event.target.files
    const results = await Promise.all(Object.values(files).map((f: any): Promise<Row[]> => {
      return new Promise((resolveFile, rejectFile) => {
        Papa.parse(f, {
          header: true,
          skipEmptyLines: true,
          complete: function (results: ParseResult<Row>) {
            const dataToResolve = results.data.map((d) => {
              const data = ParseToData(Object.values(d))
              data.fileType = f.name.toLowerCase().includes("emitidos") ? 'Venta' : 'Gasto'
              return data

            });
            resolveFile(dataToResolve)
          },
        });
      })
    }))
    for (const result of results) {
      valuesArray = [...valuesArray, ...result]
    }
    resolve(valuesArray)
  })
};

export {
  loadingFilesHandler
}