import { app, BrowserWindow } from 'electron'
import * as path  from 'path'
import * as isDev from 'electron-is-dev';
import { ipcMain } from 'electron'
import { dbRepository } from './db'
import { RecordService } from './services/recordService'
import { ClientService } from './services/clientService'
import { EventController } from './controllers/index'
import { rendererAppName } from './app/constants';
import { format } from 'url';
import { environment } from './environments/environment';

const recordService = new RecordService(dbRepository)
const clientService = new ClientService(dbRepository)
const eventController = new EventController(recordService, clientService)
dbRepository.runMigrations()


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'main.preload.js'),
      contextIsolation: true,
      backgroundThrottling: false,
    }
  })

  win.setMenu(null)
  if (isDevelopmentMode()) {
    win.loadURL('http://localhost:4200')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '..', rendererAppName, 'index.html'))   
  }
}

app.whenReady().then(() => {
  ipcMain.handle('synchronous-message', async (event, payload) => {
    console.log(' mensajeeee papu', payload)
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


function isDevelopmentMode() {
  const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnvironment: boolean =
    parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvironmentSet ? getFromEnvironment : environment.production;
}