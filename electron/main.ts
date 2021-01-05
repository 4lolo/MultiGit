import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { URL } from 'url';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  const url = Object.assign(new URL(''), {
    pathname: path.join(__dirname, `/../../dist/ImageBrowser/index.html`),
    protocol: 'file:'
  });
  win.loadURL(url.toString());

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ipcMain.on('navigateDirectory', (event, path) => {
//   process.chdir(path);
//   getImages();
//   getDirectory();
// });
