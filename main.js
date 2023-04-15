const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");
const {exec} = require("child_process")
const { stdout, stderr } = require("process");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    win.loadFile("index.html");
}

ipcMain.on('execute-command', (event, command) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log('Vai desligar');
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
});


app.whenReady().then(() => {
    createWindow();
    nativeTheme.themeSource = 'dark';

    app.on('activate', () => {
        if (BrowserWindow().length === 0) createWindow();
    });
});

app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});