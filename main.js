// Modules to control application life and create native browser window
const { app, BrowserWindow, powerSaveBlocker, protocol } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      webviewTag: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function registerP() {
  protocol.registerFileProtocol('atom', (req, callback) => {
    const assetsPath = path.resolve(__dirname, req.url.replace('atom://', ''))
    const url = path.normalize(assetsPath)
    console.log('url', url, assetsPath)
    callback(url)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let id = 0
app.whenReady().then(() => {
  registerP()
  id = powerSaveBlocker.start('prevent-app-suspension')
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  id && powerSaveBlocker.stop(id)
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
