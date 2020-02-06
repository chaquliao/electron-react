const {
    app,
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    const urlLoacation = isDev ? 'http://localhost:3000' : 'todoURL'
    mainWindow.loadURL(urlLoacation)
}

app.on('ready', createWindow)