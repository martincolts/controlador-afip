const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db');
const migrations = require('./migrations.js')

class DBService {
    constructor() { }

    runMigrations() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                
                try {
                    for (const migration of migrations) {
                        console.log(migration)
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

    insertRecord({
        composedId,
        clientCuit,
        date,
        type,
        recordType,
        numberFrom,
        numberTo,
        currency,
        impNetoGrabado,
        impNetoNoGrabado,
        impOpExentas,
        iva,
        totalAmount
    }) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare("INSERT INTO client_record (composed_id,client_cuit, record_date,type,record_type,number_from,number_to,currency,imp_neto_grabado,imp_neto_no_grabado,imp_op_exentas,iva,total_amount) values (?,?,?,?,?,?,?,?,?,?,?,?)")
                    stmt.run([composedId, clientCuit, date, type, recordType, numberFrom, numberTo, currency, impNetoGrabado, impNetoNoGrabado, impOpExentas, iva, totalAmount], (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
            })
        })
    }

    selectRecordById(id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("select * from client_record where id = ?;", [id], (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(row)
                })
            })
        })
    }

    selectRecordByComposedId(composedId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("select * from client_record where composed_id = ?;", [composedId], (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(row)
                })
            })
        })
    }

    selectRecordsBetweenDates(dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client_record where date(record_date) between date(?) and date(?);", [dateFrom, dateTo], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows)
                })
            })
        })
    }

    selectRecordsByClientCuit(clientCuit) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("select * from client_record where client_cuit = ?", [clientCuit], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows)
                })
            })
        })
    }
}

const dbService = new DBService()
module.exports = {
    dbService
}
// dbService.runMigrations().then(async data => {
//     await dbService.insertRecord({
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
//     await dbService.insertRecord({
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
//     value = await dbService.selectByComposedId('2')
//     inDates = await dbService.selectByDates('2021-07-21', '2023-05-20')
    
    
// })
