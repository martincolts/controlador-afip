const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  sendMessage: (channel, message) => ipcRenderer.send(channel, message)
})