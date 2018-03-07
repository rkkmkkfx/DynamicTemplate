/**
 * @File   : util.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as path from 'path';
import * as fs from 'mz/fs';
import * as _ from 'lodash';

import env from './environment';

export function convert(content: string, ignore_variables?: boolean): string {
    return content.replace(
        ///\{__(name|email|author|link|date|delete|camelCaseName|pascalCaseName|snakeCaseName|kebabCaseName|lowerDotCaseName)__\.?([^{}]*)\}/g,
        /\{__(\S+)__\.?([^{}]*)\}/g,
        (_, key, description) => (!ignore_variables ? env.fields[key] || '' : description)
    )
}

export function convertM(content:string, nParams:any= {"c":{}, "d":{}, "p":{}, "k":{}, "s":{}, "u":{} }):string{
    let params = env.custom, config = env.config, fields = env.fields;
    return content.replace(
        /\{__(\S+)__\.?([^{}]*)\}/g,
        (s, key, description):string => {
            let value = config.get('fields.' + key) || fields[key] || params[key] || '';
            if(typeof description === 'string' && description.length === 1){
                switch(description){
                    case "C":
                    case "c":
                        return (nParams.c[key] = nParams.c[key] || _.camelCase(value));
                    case "p":
                    case "P":
                        return (nParams.p[key] = nParams.p[key] || _.chain(value).camelCase().upperFirst().value());
                    case "s":
                    case "S":
                        return (nParams.s[key] = nParams.s[key] || _.snakeCase(value));
                    case "k":
                    case "K":
                        return (nParams.k[key] = nParams.k[key] || _.kebabCase(value));
                    case "d":
                    case "D":
                        return (nParams.d[key] = nParams.d[key] || _.snakeCase(value).replace(/_/g, '.'));
                    case "u":
                    case "U":
                        return (nParams.u[key] = nParams.u[key] || _.snakeCase(value).toUpperCase());
                    default:
                        return value;
                }
            }else{
                return value;
            }
        }
    );
}

export function absTemplatePath(...args: string[]): string {
    return path.join(env.templatesFolderPath, ...args);
}

export function absTargetPath(...args: string[]): string {
    return path.join(env.targetFolderPath, ...args);
}

export function copyFile(src, dst) {
    return new Promise((resolve, reject) => {
        fs
            .createReadStream(src)
            .pipe(fs.createWriteStream(dst))
            .on('close', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

async function copyFolder(src, dst) {
    let stats = await fs.stat(dst).catch(e => undefined);
    if (stats && !stats.isDirectory()) {
        throw Error('not folder');
    }

    await fs.mkdir(dst);
    await Promise.all(
        (await fs.readdir(src)).map(async file => {
            let source = path.join(src, file);
            let target = path.join(dst, file);

            let stats = await fs.stat(source);

            if (stats.isDirectory()) {
                await copyFolder(source, target);
            } else if (stats.isFile()) {
                await copyFile(source, target);
            }
        })
    );
}

export async function checkTemplatesFolder() {
    let templatesFolderPath = env.templatesFolderPath;
    if (!await fs.exists(templatesFolderPath)) {
        await copyFolder(path.join(env.context.extensionPath, 'templates'), templatesFolderPath);
        return await fs.exists(templatesFolderPath);
    }

    let stat = await fs.stat(templatesFolderPath);
    if (!stat.isDirectory()) {
        return false;
    }
    return true;
}
