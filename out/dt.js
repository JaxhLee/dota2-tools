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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const afs = require("./afs");
const rd = require("rd");
const libfs = require("fs");
var COMMOND;
(function (COMMOND) {
    COMMOND["CREATE_T3_ABILITY"] = "dota2-tools.create_t3_ability";
    COMMOND["EACH"] = "dota2-tools.each";
})(COMMOND || (COMMOND = {}));
class DT {
    static regcmd(command, callback, thisArg) {
        const disposable = vscode.commands.registerCommand(command, callback, this);
        this.Context.subscriptions.push(disposable);
    }
    static Install(context) {
        this.Context = context;
        this.regcmd(COMMOND.CREATE_T3_ABILITY, (e) => {
            // this.create(e)
            vscode.window.showInformationMessage('Hello World from dota2-tools!');
        });
        console.log(222);
        this.regcmd(COMMOND.EACH, (e) => {
            const path = e.fsPath;
            const count = 0;
            let sText = "";
            console.log(333333);
            rd.each(path, (filename, stats, next) => {
                if (stats.isFile()) {
                    sText += (filename + "\n");
                }
                next();
            }, (err) => {
                if (err) {
                    console.log("FormatAll: count = " + count + ", error = " + err);
                }
                else {
                    let str;
                    if (count <= 1) {
                        str = "Format " + count + " file success.";
                    }
                    else {
                        str = "Format " + count + " files success.";
                    }
                    libfs.writeFileSync("test.txt", sText, "utf8");
                    vscode.window.showInformationMessage(str);
                    console.log(sText);
                    console.log(str);
                }
            });
        });
    }
    static create(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const sPath = e.fsPath;
            const sAbilityName = sPath.substring(sPath.lastIndexOf("\\") + 1, sPath.length);
            vscode.workspace.createFileSystemWatcher;
            // vscode.TextEdit
            const sPath2 = path.join(e.fsPath, sAbilityName + ".lua");
            const uri = vscode.Uri.file(sPath2);
            let pathExists = yield afs.exists(uri.fsPath);
            if (pathExists) {
                // let doc = await vscode.workspace.openTextDocument(uri)
            }
            console.log(sAbilityName);
        });
    }
}
exports.DT = DT;
//# sourceMappingURL=dt.js.map