import * as vscode from 'vscode';
import * as path from 'path';
import * as util from './util';

import env from './environment';

import { AutoTemplate } from './AutoTemplate';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('dynamicTemplate.autoCommand', async function(e: vscode.Uri) {
            try {
                await util.checkTemplatesFolder();

                let targetFolderPath = e && e.fsPath ? e.fsPath : vscode.workspace.rootPath;
                let fileCreator = new AutoTemplate(targetFolderPath);

                await fileCreator.run();
            } catch (error) {
                vscode.window.showErrorMessage(`Template Generator: ${error.message}`);
            }
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('dynamicTemplate.openTemplatesFolder', async function() {
            try {
                await util.checkTemplatesFolder();

                let uri = vscode.Uri.file(env.templatesFolderPath);
                vscode.commands.executeCommand('vscode.openFolder', uri, true);
            } catch (error) {
                vscode.window.showErrorMessage(`Template Generator: ${error.message}`);
            }
        }),
    );

    env.context = context;
}

export function deactivate() {}
