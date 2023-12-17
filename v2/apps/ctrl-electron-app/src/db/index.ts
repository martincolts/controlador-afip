import { Database } from "sqlite3";
import { migrations } from './migrations'
import { AFIPRecordRow, Client, mapFromRecordRaw, mapFromRecordRaws, mapFromClientRaws } from "@v2/model";

const db = new Database('db.db');


export class DBRepository {
    constructor() { }

    runMigrations() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                try {
                    for (const migration of migrations) {
                        console.log(migration) // change for real logger
                        db.run(migration)
                    }
                } catch (e) {
                    reject(false)
                } finally {
                    resolve(true)
                }
            })
        })
    }

    insertRecord(record: AFIPRecordRow): Promise<boolean> {
        const {
            composedId,
            clientCuit,
            date,
            sellPoint,
            numberFrom,
            numberTo,
            authCod,
            typeReceptorCode,
            docReceptor,
            receptorDenomination,
            changeType,
            currency,
            taxNet,
            noTaxNet,
            impOpExentas,
            iva,
            total,
            fileType,
            receiptType
        } = record;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare("INSERT INTO client_record (composed_id,client_cuit,record_date,sell_point,number_from,number_to,auth_cod, type_receptorCode, doc_receptor, receptor_denomination, change_type, currency,imp_neto_grabado,imp_neto_no_grabado,imp_op_exentas,iva,total_amount, type, receipt_type) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
                    stmt.run([composedId, clientCuit, date, sellPoint, numberFrom, numberTo, authCod,typeReceptorCode, docReceptor, receptorDenomination, changeType, currency, taxNet, noTaxNet, impOpExentas, iva, total, fileType, receiptType], (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
            })
        })
    }

    deleteRecordsByClientCuit(clientCuit: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare("DELETE FROM client_record where client_cuit = ?;")
                stmt.run([clientCuit], (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            })
        })
    }

    selectRecordById(id: string): Promise<AFIPRecordRow> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("select * from client_record where id = ?;", [id], (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaw(row))
                })
            })
        })
    }

    selectRecordByComposedId(composedId: string): Promise<AFIPRecordRow> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("select * from client_record where composed_id = ?;", [composedId], (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaw(row))
                })
            })
        })
    }

    selectRecordsBetweenDates(dateFrom: string, dateTo: string): Promise<AFIPRecordRow[]> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client_record where date(record_date) between date(?) and date(?);", [dateFrom, dateTo], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaws(rows))
                })
            })
        })
    }

    selectGastosBetweenDates(dateFrom: string, dateTo: string, cuit: string): Promise<AFIPRecordRow[]> {
        return new Promise((resolve, reject) => {
            console.log({ dateFrom, dateTo, cuit})
            db.serialize(() => {
                db.all("select * from client_record where date(record_date) between date(?) and date(?) and type = 'Gasto' and client_cuit = ? order by date(record_date) asc;", [dateFrom, dateTo, cuit], (err, rows) => {
                    console.log(err, rows)
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaws(rows))
                })
            })
        })
    }

    selectVentasBetweenDates(dateFrom: string, dateTo: string, cuit: string): Promise<AFIPRecordRow[]> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client_record where date(record_date) between date(?) and date(?) and type = 'Venta' and client_cuit = ? order by date(record_date) asc;", [dateFrom, dateTo, cuit], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaws(rows))
                })
            })
        })
    }

    selectRecordsByClientCuit(clientCuit: string): Promise<AFIPRecordRow[]> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client_record where client_cuit = ?", [clientCuit], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(mapFromRecordRaws(rows))
                })
            })
        })
    }

    insertClient(client: Client): Promise<boolean> {
        const {
            cuit, 
            firstName,
            lastName,
            dni,
            phone,
            email
        } = client;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const statement = db.prepare("INSERT INTO client (cuit, first_name, last_name, dni, phone, email) values (?,?,?,?,?,?)")
                statement.run([cuit, firstName, lastName, dni, phone, email], (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            })
        })
    }

    listClients(): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client", (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    console.log('CLIENEEET', rows)
                    resolve(mapFromClientRaws(rows))
                })
            })
        })
    }
}

const dbRepository = new DBRepository()
export {
   dbRepository
}
// dbRepository.runMigrations().then(async data => {
//     await dbRepository.insertRecord({
//         composedId: '1',
//         clientCuit: 'efdf',
//         date: '2023-05-20',
//         type: 'emitido',
//         recordType: 'recordType',
//         numberFrom: 1,
//         numberTo: 2,
//         currency: '$',
//         impNetoGrabado: 2343,
//         impNetoNoGrabado: 343,
//         impOpExentas: 45,
//         iva: 4565,
//         totalAmount: 1224.5
//     })
//     await dbRepository.insertRecord({
//         composedId: '2',
//         date: '2023-06-20',
//         clientCuit: 'efdf',
//         type: 'emitido',
//         recordType: 'recordType',
//         numberFrom: 1,
//         numberTo: 2,
//         currency: '$',
//         impNetoGrabado: 2343,
//         impNetoNoGrabado: 343,
//         impOpExentas: 45,
//         iva: 4565,
//         totalAmount: 1224.5
//     })
//     value = await dbRepository.selectByComposedId('2')
//     inDates = await dbRepository.selectByDates('2021-07-21', '2023-05-20')
    
    
// })

// dbRepository.runMigrations().then( async data => {
//     await dbRepository.insertClient({
//         cuit: "20344214787",
//         firstName: "Martin",
//         lastName: "Lopez",
//         dni: "34421478",
//         phone: "2494209692"
//     })
//     await dbRepository.insertClient({
//         cuit: "20344214788",
//         firstName: "Martin",
//         lastName: "Lopez",
//         dni: "344214789",
//         phone: "2494209692"
//     })

//     const result = await dbRepository.listClients()
//     console.log(result)
// })