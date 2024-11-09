"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const Configuration_1 = require("./ElectronStore/Configuration");
const AutoUpdate_1 = __importDefault(require("./AutoUpdate"));
async function createWindow() {
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const appBounds = Configuration_1.appConfig.get("setting.appBounds");
    const BrowserWindowOptions = {
        width: 1200,
        minWidth: 900,
        height: 750,
        minHeight: 600,
        webPreferences: {
            preload: __dirname + "/preload.js",
            devTools: config_1.isDev,
        },
        show: false,
        alwaysOnTop: true,
        frame: true,
    };
    if (appBounds !== undefined && appBounds !== null)
        Object.assign(BrowserWindowOptions, appBounds);
    const mainWindow = new electron_1.BrowserWindow(BrowserWindowOptions);
    if (!config_1.isDev)
        (0, AutoUpdate_1.default)();
    await mainWindow.loadURL(config_1.isDev ? "http://localhost:3000" : `file://${path_1.default.join(__dirname, "./index.html")}`);
    if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height)
        mainWindow.maximize();
    else
        mainWindow.show();
    setTimeout(() => {
        mainWindow.setAlwaysOnTop(false);
    }, 1000);
    if (config_1.isDev) {
        mainWindow.webContents.openDevTools();
    }
    electron_1.ipcMain.handle('versions', () => {
        return {
            node: process.versions.chrome,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            version: electron_1.app.getVersion(),
            name: electron_1.app.getName(),
        };
    });
}
electron_1.app.whenReady().then(async () => {
    if (config_1.isDev) {
        try {
            const { installExt } = await Promise.resolve().then(() => __importStar(require("./installDevTool")));
            await installExt();
        }
        catch (e) {
            console.log("Can not install extension!");
        }
    }
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
