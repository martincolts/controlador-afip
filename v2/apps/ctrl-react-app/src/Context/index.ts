import * as React from 'react'

export const actions = {
    CREATE_RECORD: 'CREATE_RECORD',
    CREATE_RECORDS: 'CREATE_RECORDS',
    FILTER_RECORDS_BY_CLIENT_CUIT: 'FILTER_SERVICE',
    CREATE_CLIENT: 'CREATE_CLIENT',
    LIST_CLIENTS: 'LIST_CLIENTS',
    LIST_GASTOS_BY_DATES: 'LIST_GASTOS_BY_DATES',
    LIST_VENTAS_BY_DATES: 'LIST_VENTAS_BY_DATES'
}

export interface Message {
    action: string;
    payload: any;
}

export interface ElectronAPI {
    sendMessage(channel: string, message: any): Promise<any>;
    invokeBackend(channel: string, message: Message): Promise<any>;
}

export const ElectronContext: React.Context<any> = React.createContext(undefined)



