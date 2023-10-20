import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  sendMessage: (channel: string, message: any) => ipcRenderer.send(channel, message),
  invokeBackend: (channel: string, args: any) => ipcRenderer.invoke(channel, args)
})