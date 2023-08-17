import * as React from 'react'

export interface Message {
    action: string;
    payload: any;
}

export interface ElectronAPI {
    sendMessage(channel: string, message: any): Promise<any>;
    invokeBackend(channel: string, message: Message): Promise<any>;
}

export const ElectronContext: React.Context<ElectronAPI> = React.createContext(undefined)



