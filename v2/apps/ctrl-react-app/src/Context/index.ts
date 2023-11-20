import * as React from 'react'

export interface Message {
    action: string;
    payload: any;
}

export interface ElectronAPI {
    sendMessage(channel: string, message: any): Promise<any>;
    invokeBackend<T>(channel: string, message: Message): Promise<T>;
}

export const ElectronContext: React.Context<ElectronAPI> = React.createContext({} as ElectronAPI)



