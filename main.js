const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const log = require('electron-log');


function createWindow() {
  const win = new BrowserWindow({
    width: 430,
    height: 540,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadFile('index.html');
 // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
  
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });