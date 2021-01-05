import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as express from 'express';
import * as path from 'path';
import { Guid } from 'guid-typescript';

const token: string = new Buffer(Guid.create().toString()).toString('base64');
const expressApp: express.Application = express();
let expressServer: any = null;
let win: BrowserWindow | null = null;

expressApp.use((req, res, next) => {
  const reqToken = req.headers['x-token'];
  if (reqToken !== token) {
    res.statusCode = 401;
    res.end('Unauthorized');
    return;
  }

  next();
});
expressApp.use('/api/config', (req, res, next) => {
  res.end(JSON.stringify({
    token: token
  }));
});
expressApp.use(express.static(path.join(__dirname, `/../../dist/MultiGit`)));

function createWindow(): void {
  expressServer = expressApp.listen('4000');

  win = new BrowserWindow({ width: 1280, height: 600 });
  win.loadURL('http://localhost:4000');
  // win.loadURL('file://' + path.join(__dirname, `/../../dist/MultiGit/index.html`));

  win.webContents.openDevTools();

  win.on('closed', () => {
    expressServer.close();
    expressServer = null;
    win = null;
  });
}

app.on('ready', () => {
  session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['http://localhost:4000/*'] }, (details, callback) => {
    details.requestHeaders['X-Token'] = token;
    callback({ requestHeaders: details.requestHeaders })
  });

  createWindow();
});

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

ipcMain.on('navigateDirectory', (event) => {
//   process.chdir(path);
//   getImages();
//   getDirectory();
});
