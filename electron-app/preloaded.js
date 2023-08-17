const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
  sendMessage: (channel, message) => ipcRenderer.send(channel, message),
  invokeBackend: (channel, arguments) => ipcRenderer.invoke(channel, arguments)
})