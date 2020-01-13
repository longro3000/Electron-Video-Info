const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

ffmpeg.setFfprobePath("e:\\workspace\\ffmpeg-20200113-7225479-win64-static\\bin\\ffprobe.exe");
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});