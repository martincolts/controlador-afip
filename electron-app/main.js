const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');
const {ipcMain} = require('electron')
const { dbService } = require('./db')
const { RecordService } = require('./services/recordService')
dbService.runMigrations()

const recordService = new RecordService(dbService)


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preloaded.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile('build/index.html')
  }

  win.webContents.openDevTools({ mode: 'detach' })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log("message ", arg) 

  // Synchronous event emmision
  event.sender()
})