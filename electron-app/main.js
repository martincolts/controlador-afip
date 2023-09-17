const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron')
const { dbRepository } = require('./db')
const { RecordService } = require('./services/recordService')
const { ClientService } = require('./services/clientService')
const { EventController } = require('./controllers/index')

const recordService = new RecordService(dbRepository)
const clientService = new ClientService(dbRepository)
const eventController = new EventController(recordService, clientService)
dbRepository.runMigrations()


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

  win.setMenu(null)

  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile('build/index.html')
  }
}

app.whenReady().then(() => {
  ipcMain.handle('synchronous-message', async (event, payload) => {
    console.log(' mensajeeee papu', payload)
    //return {message: 'sarasa'}
    return await eventController.processMessage(payload)
  })
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