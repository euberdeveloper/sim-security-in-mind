"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const electron_store_1 = __importDefault(require("electron-store"));
exports.appConfig = new electron_store_1.default({
    name: 'appConfig',
    defaults: {
        setting: {},
    },
    schema: {
        setting: {
            type: 'object',
        },
    },
});
