import { app, BrowserWindow, Menu, ipcMain, shell, dialog } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import fs from 'fs'
import {autoUpdater} from 'electron-updater'

let mainWindow: BrowserWindow;

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        title: "Mini Gest",
        icon: path.join(__dirname, 'logo192.png'),
    });
    /**
     * Controllo di versione
     */
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (
        mainWindow.destroy()
    ))

    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify()
    })
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit()
})
app.on("activate", () => {
    mainWindow === null && createWindow()
})

/**
 * Custom menu
 */
const isMac: boolean = process.platform === 'darwin'

const template: any = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ] : [
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    {
        role: 'i',
        submenu: [{
            label: 'About the author',
            click: async() => {
                await shell.openExternal("https://www.stefanopascazi.com")
            }
        }]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const save = (content:string) => {

    var options = {
        title: "Save file",
        defaultPath: "my_filename.csv",
        buttonLabel: "Save",

        filters: [
            { name: 'csv', extensions: ['csv'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };

    dialog.showSaveDialog(mainWindow, options).then(({ filePath }) => {
        typeof filePath !== 'undefined' && fs.writeFile(filePath, content, (error: any): void => {
            if (error) console.log("Error", error)
            return;
        });
    });
}

/**
 * Auto updater
 */
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
    mainWindow.webContents.send("update_available")
})

autoUpdater.on("update-downloaded", () => {
    mainWindow.webContents.send("update_downloaded")
})

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

/**end */
/**
 * custom message
 */

ipcMain.on("saveFile", (e, content) => {
    save(content)
    e.returnValue = "Done"
})

ipcMain.on("loadFile", (e, args:string) => {
    fs.readFile(args, (_err, data) => {
        var rows: string[] = data.toString().split("\n");
        const newRows: Array<Array<string>> = [];
        for (let i in rows) {
            let lines: string[] = rows[i].toString().split("\t");
            newRows.push(lines)
        }
        e.returnValue = newRows
    })

})

/**
 * testing
 */
// ipcMain.on("test", (e, args) => {
//     console.log(province)
//     e.returnValue = "done"
// })