const {
    app,
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
    require('devtron').install()
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    const urlLoacation = isDev ? 'http://localhost:3000' : 'todoURL'
    mainWindow.loadURL(urlLoacation)
    mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)