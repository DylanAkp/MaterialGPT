import { app, BrowserWindow, nativeTheme, screen } from 'electron'
import path from 'path'
import os from 'os'

const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '/icons/icon.png'),
    width: 600,
    height: 1000,
    resizable: false,
    frame: true,
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function showWindow() {
  const trayBounds = tray.getBounds()
  const mainWindowBounds = mainWindow.getBounds()
  const display = screen.getPrimaryDisplay()
  const taskbarPosition = display.workArea.y === 0 ? 'top' : 'bottom'

  let x, y
  x = trayBounds.x + Math.round(trayBounds.width / 2) - Math.round(mainWindowBounds.width / 2)
  y = trayBounds.y - mainWindowBounds.height - 10

  mainWindow.setPosition(x, y, false)
  mainWindow.show()
  mainWindow.focus()
}

app.whenReady().then(() => {
  createWindow()
  createTrayIcon()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
