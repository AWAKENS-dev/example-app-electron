var path = require("path");
var log = require('electron-log');

const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// TODO: DRY
var addr = "localhost:1323";

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        'accept-first-mouse': true,
        'title-bar-style': 'hidden'
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

                // Open the DevTools.
                // win.webContents.openDevTools();

                // Emitted when the window is closed.
                win.on('closed', () => {
                    // Dereference the window object, usually you would store windows
                    // in an array if your app supports multi windows, this is the time
                    // when you should delete the corresponding element.
                    win = null;
                });
               }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

    var child_process = require('child_process')
    var server_process = child_process.execFile(path.join(__dirname, 'awtk'), ['runserver', addr], {cwd: __dirname});
    log.info('server process cmd: ' + server_process.spawnargs.join(' '));
    log.info('server process pid: ' + server_process.pid);

    server_process.stdout.on('data', function (data) {
        log.info('[awtk] stdout: ' + data.trim());
    });

    server_process.stderr.on('data', function (data) {
        log.info('[awtk] stderr: ' + data.trim());
    });

    // server_process.on('exit', function (code) {
    // });

    server_process.on('close', function (code, signal) {
        log.info('server process closed with code: ' + code);
        log.info('server process closed with signal: ' + signal);
    });

    //
    process.on('uncaughtException', function (err) {
        log.error('caught exception: ' + err);
    });

    app.on('will-quit', function () {
        server_process.kill('SIGINT');
    });

    // app.on('quit', function () {
    // });
