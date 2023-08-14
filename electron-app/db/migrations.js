const createRecordTable = `CREATE TABLE IF NOT EXISTS client_record (
    id integer primary key autoincrement,
    composed_id text not null unique,
    record_date text not null,
    type text not null,
    record_type text not null,
    number_from integer not null,
    number_to integer not null,
    amount real not null
);`

const migrations = [
    createRecordTable
]

module.exports = migrations
