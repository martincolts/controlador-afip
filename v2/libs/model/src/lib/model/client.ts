export interface Client {
    id?: number;
    cuit: string;
    firstName: string;
    lastName: string;
    phone: string;
    dni: string;
    email: string;
}


export function mapFromClientRaw (row: any): Client {
    return {
        id: row.id,
        cuit: row.cuit,
        firstName: row.first_name,
        lastName: row.last_name,
        dni: row.dni,
        phone: row.phone,
        email: row.email
    }
}

export function mapFromClientRaws (rows: any[]): Client[] {
    return rows.map(r => mapFromClientRaw(r))
}