import * as vscode from 'vscode';

import * as path from 'path';
import * as afs from './afs';
import * as rd from 'rd';
import { create } from 'domain';
import * as libfs from 'fs';

enum COMMOND {
	CREATE_T3_ABILITY = "dota2-tools.create_t3_ability",
	EACH = "dota2-tools.each",
}

export class DT {
	static Context: vscode.ExtensionContext

	static regcmd(command: string, callback: (...args: any[]) => any, thisArg?: any) {
		const disposable = vscode.commands.registerCommand(command, callback, this);
		this.Context.subscriptions.push(disposable);
	}

	public static Install(context: vscode.ExtensionContext) {
		this.Context = context

		this.regcmd(COMMOND.CREATE_T3_ABILITY, (e: vscode.Uri) => {

			// this.create(e)

			vscode.window.showInformationMessage('Hello World from dota2-tools!');
		})

		console.log(222);
		this.regcmd(COMMOND.EACH, (e: vscode.Uri) => {
			const path = e.fsPath
			const count = 0;

			let sText = ""
			console.log(333333);

			rd.each(path, (filename, stats: libfs.Stats, next) => {
				if (stats.isFile()) {
					sText += (filename + "\n")
				}
				next()
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
					libfs.writeFileSync("test.txt", sText, "utf8")
					vscode.window.showInformationMessage(str);
					console.log(sText);
					console.log(str);
				}
			})
		})
	}

	static async create(e: vscode.Uri) {
		const sPath: string = e.fsPath
		const sAbilityName = sPath.substring(sPath.lastIndexOf("\\") + 1, sPath.length)

		vscode.workspace.createFileSystemWatcher
		// vscode.TextEdit

		const sPath2 = path.join(e.fsPath, sAbilityName + ".lua")
		const uri = vscode.Uri.file(sPath2)

		let pathExists = await afs.exists(uri.fsPath)
		if (pathExists) {
			// let doc = await vscode.workspace.openTextDocument(uri)


		}

		console.log(sAbilityName);
	}
}