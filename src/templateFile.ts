/**
 * @File   : templateFile.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as util from './util';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { once } from './decorators';

export class TemplateFile {
    public constructor(public readonly templatePath: string) {}

    @once()
    public get targetPath(): string {
        return util.absTargetPath(util.convert(this.templatePath));
    }

    @once()
    public get content(): string {
        return util.convert(this.read());
    }

    @once()
    public get originContent():string{
        return this.read();
    }

    public runACMD(){
        let content:string[] = this.originContent.split(/\r?\n?\r?\/\/===ACMD===\r?\n?\r?/mg);
        let c:string;
        let tp:object = {"c":{}, "d":{}, "p":{}, "k":{}, "s":{}, "u":{} };
        let empty:RegExp = /^\s*$/;
        while(content.length > 0 && (c = content.shift())){
            if(c.toLowerCase() === 'add'){
                let p = util.absTargetPath(util.convertM(content.shift(), tp));
                mkdirp.sync(path.dirname(p));
                if(fs.existsSync(p)){
                    let tempName:string = p + '.tmp'+ (Math.random()*100000>>0);
                    console.log(`The file ${p} already exists, the file ${tempName} will be automatically backed up and overwritten`);
                    util.copyFile(p, tempName);
                }
                fs.writeFileSync(p, util.convertM(content.shift(), tp));
            }else if(c.toLowerCase() === 'insert'){
                let p = util.absTargetPath(util.convertM(content.shift(), tp));
                if(fs.existsSync(p)){
                    let tf:string = fs.readFileSync(p).toString();
                    while(content.length > 1 && empty.test(c = content.shift()) == false){
                        let ip = tf.indexOf(c);
                        if(ip != -1){
                            tf = tf.slice(0, ip) + util.convertM(content.shift(),tp) + tf.slice(ip);
                        }else{
                            content.shift();
                        }
                    }
                    fs.writeFileSync(p, tf);
                }else{
                    console.log(`File ${p} does not exist, plugin operation failed`);
                }
                while(content.length > 0){
                    if(empty.test(c))break;
                    c = content.shift();
                }
            }else if(c.toLowerCase() == 'open'){
                let p = util.absTargetPath(util.convertM(content.shift(), tp));
                if(fs.existsSync(p)){
                    vscode.commands.executeCommand('vscode.open', vscode.Uri.file(p));
                }
            }
        }
    }

    private read(): string {
        return fs.readFileSync(util.absTemplatePath(this.templatePath)).toString();
    }
}
