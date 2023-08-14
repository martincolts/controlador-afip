const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db');
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

    insertRecord(record) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare("INSERT INTO client_record (composed_id,record_date,type,record_type,number_from,number_to,amount) values (?,?,?,?,?,?,?)")
                try {
                    stmt.run(record.composedId, record.date, record.type, record.recordType, record.numberFrom, record.numberTo, record.amount)
                } catch(e) {
                    reject(false)
                } finally {
                    resolve(true)
                }
            })
        })
        
    }
}

const dbService = new DBService()
dbService.runMigrations().then(data => {
    console.log(data)
    dbService.insertRecord({
        key: 2,
        composedId: 'dfsdfs',
        date: '13-08-2023',
        type: 'emitido',
        recordType: 'recordType',
        numberFrom: 1,
        numberTo: 2,
        amount: 13150.50
    })
})