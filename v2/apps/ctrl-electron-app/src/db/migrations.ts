const createRecordTable = `CREATE TABLE IF NOT EXISTS client_record (
    id integer primary key autoincrement,
    composed_id text not null unique,
    client_cuit text not null,
    record_date text not null,
    sell_point number not null,
    type text not null,
    receipt_type text not null,
    number_from integer not null,
    number_to integer not null,
    auth_cod text,
    doc_receptor text,
    receptor_denomination text,
    type_receptorCode text not null,
    change_type text not null,
    currency text not null,
    imp_neto_grabado real not null,
    imp_neto_no_grabado real not null,
    imp_op_exentas real not null,
    iva real not null,
    total_amount real not null
);`


const createClientTable = `CREATE TABLE IF NOT EXISTS client (
    id integer primary key autoincrement,
    cuit text not null unique,
    first_name text not null,
    last_name text not null,
    dni text not null unique,
    phone text,
    email text
)`

const migrations = [
    createRecordTable,
    createClientTable
]

export {
    migrations
}
