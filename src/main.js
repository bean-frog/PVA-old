const { app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');


let mainWindow;
let alertWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile('src/index.html'); 
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain.on('open-alerts', function(){
  if (alertWindow) {
    return;
  }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    alertWindow = new BrowserWindow({
      width: width,
      height: height,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    alertWindow.loadFile('src/alerts.html'); 
    alertWindow.on('closed', function () {
      alertWindow = null;
    });
    
});


