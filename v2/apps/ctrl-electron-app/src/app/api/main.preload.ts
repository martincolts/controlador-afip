// import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld('electron', {
//   getAppVersion: () => ipcRenderer.invoke('get-app-version'),
//   platform: process.platform,
// });


import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  sendMessage: (channel: string, message: any) => ipcRenderer.send(channel, message),
  invokeBackend: (channel: string, args: any) => ipcRenderer.invoke(channel, args)
})