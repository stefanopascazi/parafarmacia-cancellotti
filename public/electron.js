"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var fs_1 = __importDefault(require("fs"));
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        title: "Mini Gest",
        icon: path_1.default.join(__dirname, 'logo192.png'),
        /* frame: false */
    });
    /**
     * Controllo di versione
     */
    mainWindow.loadURL(electron_is_dev_1.default ? "http://localhost:3000" : "file://" + path_1.default.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return (mainWindow.destroy()); });
};
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    process.platform !== "darwin" && electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    mainWindow === null && createWindow();
});
/**
 * Custom menu
 */
var isMac = process.platform === 'darwin';
var template = __spreadArray(__spreadArray([], (isMac ? [{
        label: electron_1.app.name,
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
    }] : []), true), [
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
        submenu: __spreadArray([
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' }
        ], (isMac ? [
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
        ]), true)
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
        submenu: __spreadArray([
            { role: 'minimize' },
            { role: 'zoom' }
        ], (isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
        ] : [
            { role: 'close' }
        ]), true)
    },
    {
        role: 'help',
        submenu: [{
                label: 'About the author',
                click: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, electron_1.shell.openExternal("https://www.stefanopascazi.com")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }
            }]
    }
], false);
var menu = electron_1.Menu.buildFromTemplate(template);
electron_1.Menu.setApplicationMenu(menu);
var save = function (content) {
    var options = {
        title: "Save file",
        defaultPath: "my_filename.csv",
        buttonLabel: "Save",
        filters: [
            { name: 'csv', extensions: ['csv'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };
    electron_1.dialog.showSaveDialog(mainWindow, options).then(function (_a) {
        var filePath = _a.filePath;
        typeof filePath !== 'undefined' && fs_1.default.writeFile(filePath, content, function (error) {
            if (error)
                console.log("Error", error);
            return;
        });
    });
};
/**
 * Auto updater
 */
electron_1.ipcMain.on('app_version', function (event) {
    event.sender.send('app_version', { version: electron_1.app.getVersion() });
});
/**end */
/**
 * custom message
 */
electron_1.ipcMain.on("saveFile", function (e, content) {
    save(content);
    e.returnValue = "Done";
});
electron_1.ipcMain.on("loadFile", function (e, args) {
    fs_1.default.readFile(args, function (_err, data) {
        var rows = data.toString().split("\n");
        var newRows = [];
        for (var i in rows) {
            var lines = rows[i].toString().split("\t");
            newRows.push(lines);
        }
        e.returnValue = newRows;
    });
});
