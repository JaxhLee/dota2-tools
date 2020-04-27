"use strict";
// This file promisifies necessary file system functions. 
// This should be removed when VS Code updates to Node.js ^11.14 and replaced by the native fs promises.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
function handleResult(resolve, reject, error, result) {
    if (error) {
        reject(massageError(error));
    }
    else {
        resolve(result);
    }
}
function massageError(error) {
    if (error.code === 'ENOENT') {
        return vscode.FileSystemError.FileNotFound();
    }
    if (error.code === 'EISDIR') {
        return vscode.FileSystemError.FileIsADirectory();
    }
    if (error.code === 'EEXIST') {
        return vscode.FileSystemError.FileExists();
    }
    if (error.code === 'EPERM' || error.code === 'EACCESS') {
        return vscode.FileSystemError.NoPermissions();
    }
    return error;
}
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, buffer) => handleResult(resolve, reject, error, buffer));
    });
}
exports.readFile = readFile;
function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, error => handleResult(resolve, reject, error, void 0));
    });
}
exports.writeFile = writeFile;
function exists(path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, exists => handleResult(resolve, reject, null, exists));
    });
}
exports.exists = exists;
function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (error, files) => handleResult(resolve, reject, error, files));
    });
}
exports.readdir = readdir;
function unlink(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, error => handleResult(resolve, reject, error, void 0));
    });
}
exports.unlink = unlink;
//# sourceMappingURL=afs.js.map