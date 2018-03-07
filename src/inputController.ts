/**
 * @File   : inputController.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';

import { Template } from './template';
import env from './environment';

export interface IInput {
    template?: Template;
    fileName?: string;
}

const validateNameRegex = ((): RegExp => {
    if (process.platform === 'win32') {
        return /[/?*:|<>\\]/;
    } else if (process.platform === 'darwin') {
        return /[/:]/;
    } else {
        return /\//;
    }
})();

export class InputController {
    public constructor() {}

    private async showTemplatePicker(templates: Template[]) {
        let template = await vscode.window.showQuickPick(templates, {
            placeHolder: 'Select file/folder template:'
        });
        return template;
    }

    private async showNameInput() {
        let fileName = await vscode.window.showInputBox({
            placeHolder: 'Input file/folder name',
            validateInput: text => (validateNameRegex.test(text) ? 'Invalidate file name' : null)
        });
        return fileName;
    }

    public async run(templates: Template[]): Promise<IInput> {
        let template = await this.showTemplatePicker(templates);
        if (!template) {
            return {};
        }
        if(template.isACMD){
            let p:object = template.params;
            let f = env.fields;
            let conf = env.config;
            for(let key in p){
                if(f[key] === undefined && conf.get('fields.' + key) === undefined){
                    p[key] = await vscode.window.showInputBox({
                        placeHolder: '请输入模板参数[' + key + ']的值:',
                    })
                }
            }
            return {template};
        }
        let fileName = await this.showNameInput();
        if (!fileName) {
            return {};
        }
        return { template, fileName };
    }
}
