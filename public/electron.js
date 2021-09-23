const { app, BrowserWindow, Menu, ipcMain, shell, dialog } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs")

let mainWindow;

const createWindow = () => {
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
        /* frame: false */
    });
    /**
     * Controllo di versione
     */
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (
        mainWindow = null
    ))
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
const isMac = process.platform === 'darwin'

const template = [
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
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: () => {
                mainWindow.loadURL(
                    isDev ? "http://localhost:3000/#/page/help" : `file://${path.join(__dirname, "../build/index.html#/page/help")}`
                )
            }
        }, {
            label: 'About the author',
            click: async() => {
                await shell.openExternal("https://www.stefanopascazi.com")
            }
        }]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const save = (content) => {

    var options = {
        title: "Save file",
        defaultPath: "my_filename.csv",
        buttonLabel: "Save",

        filters: [
            { name: 'csv', extensions: ['csv'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };

    dialog.showSaveDialog(null, options).then(({ filePath }) => {
        fs.writeFile(filePath, content, (err, data) => err && console.log("Error", err));
    });
}

/**
 * custom message
 */

ipcMain.on("saveFile", (e, content) => {
    save(content)
    e.returnValue = "Done"
})

ipcMain.on("loadFile", (e, args) => {
    fs.readFile(args, (err, data) => {
        var rows = data.toString().split("\n");
        const newRows = [];
        for (let row in rows) {
            let lines = rows[row].toString().split("\t");
            newRows.push(lines)
        }
        e.returnValue = newRows
    })

})