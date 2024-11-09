"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
exports.default = () => {
    if (electron_1.app.isPackaged) {
        electron_updater_1.autoUpdater.autoInstallOnAppQuit = true;
        electron_updater_1.autoUpdater.checkForUpdates();
        electron_updater_1.autoUpdater.addListener('update-downloaded', (info) => {
            electron_1.dialog
                .showMessageBox({
                title: 'Restart Believers Sword?',
                type: 'question',
                message: `New version "Believers Sword ${info.version}" has been successfully downloaded.`,
                buttons: ['Yes', 'Later', 'Yes, Update'],
                cancelId: 1,
            })
                .then(({ response }) => {
                if (response == 0 || response == 2) {
                    electron_updater_1.autoUpdater.quitAndInstall();
                }
            });
        });
    }
};
