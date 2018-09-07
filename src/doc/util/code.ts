/**
 * @author WMXPY
 * @description Doc Util
 * @fileoverview Code
 */

import * as Fs from "fs";
import * as Path from 'path';
// tslint:disable-next-line
import { ExpressAssertionType, EXPRESS_ASSERTION_TYPES_END, EXPRESS_ASSERTION_TYPES_UNION, IExpressRoute } from "../../service/interface";

export const htmlMarkusImage = (domain: string, route: IExpressRoute): string => {
    const data: string = readAndReplaceTemplateFromAssets('html-get-image-from-url', {
        path: domain,
    });
    return data;
};

export const nodeMarkusFormData = (domain: string, route: IExpressRoute): string => {
    const append: string[] = [];
    if (route.authorization) {
        append.push(`form.append('key', AUTH KEY);`);
    }
    const parseType = (key: string, current: ExpressAssertionType): string[] => {
        const temp: string[] = [];
        switch (current.type) {
            case EXPRESS_ASSERTION_TYPES_END.FILE:
                temp.push(
                    `const original = ${EXPRESS_ASSERTION_TYPES_END.STRING};`,
                    `const extName = path.extname(original);`,
                    `form.append('${key}', BUFFER, {`,
                    `    filename: original,`,
                    `    contentType: 'image/' + extName.substring(1, extName.length),`,
                    `});`,
                );
                break;
            case EXPRESS_ASSERTION_TYPES_END.STRING:
            case EXPRESS_ASSERTION_TYPES_END.NUMBER:
                temp.push(`form.append('${key}', ${current.type});`);
                break;
            case EXPRESS_ASSERTION_TYPES_UNION.ARRAY:
                if (current.split) {
                    temp.push(`form.append('${key}', [${current.child.type}].join('${current.split}'));`);
                } else {
                    temp.push(`form.append('${key}', [${current.child.type}]);`);
                }
        }
        if (current.optional) {
            if (temp.length === 1) {
                temp[0] += ' // Optional';
            } else {
                temp.unshift('// Optional');
            }
        }
        return temp;
    }

    if (route.assertBody) {
        for (let i of Object.keys(route.assertBody)) {
            const current = route.assertBody[i]
            append.push(...parseType(i, current));
        }
    }
    const data: string = readAndReplaceTemplateFromAssets('node-markus-form-data', {
        domain,
        append: append.join('\n'),
    });
    return data;
};

export const nodeMarkusURLUrlencoded = () => {
    return null;
};

export const fetchMarkusFormData = (domain: string, route: IExpressRoute): string => {
    const append: string[] = [];
    if (route.authorization) {
        append.push(`form.append('key', AUTH KEY);`);
    }
    const parseType = (key: string, current: ExpressAssertionType): string[] => {
        const temp: string[] = [];
        switch (current.type) {
            case EXPRESS_ASSERTION_TYPES_END.FILE:
                temp.push(`form.append('${key}', ${current.type});`);
                break;
            case EXPRESS_ASSERTION_TYPES_END.STRING:
            case EXPRESS_ASSERTION_TYPES_END.NUMBER:
                temp.push(`form.append('${key}', ${current.type});`);
                break;
            case EXPRESS_ASSERTION_TYPES_UNION.ARRAY:
                if (current.split) {
                    temp.push(`form.append('${key}', [${current.child.type}].join('${current.split}'));`);
                } else {
                    temp.push(`form.append('${key}', [${current.child.type}]);`);
                }
        }
        if (current.optional) {
            if (temp.length === 1) {
                temp[0] += ' // Optional';
            } else {
                temp.unshift('// Optional');
            }
        }
        return temp;
    }

    if (route.assertBody) {
        for (let i of Object.keys(route.assertBody)) {
            const current = route.assertBody[i]
            append.push(...parseType(i, current));
        }
    }
    const data: string = readAndReplaceTemplateFromAssets('fetch-markus-form-data', {
        domain,
        append: append.join('\n'),
    });
    return data;
};

export const fetchMarkusURLUrlencoded = () => {
    return null;
};

export const readAndReplaceTemplateFromAssets = (name: string, replaces: {
    [key: string]: string;
}) => {
    let content: string = Fs.readFileSync(Path.resolve('assets', 'code', name + '.template'), 'UTF8');
    for (let key of Object.keys(replaces)) {
        content = content.replace(new RegExp('\\${' + key + '}', 'g'), replaces[key]);
    }
    return content;
};

export const oneOfUnion = (type: string): boolean => {
    if (type === EXPRESS_ASSERTION_TYPES_UNION.ARRAY) {
        return true;
    }
    if (type === EXPRESS_ASSERTION_TYPES_UNION.OBJECT) {
        return true;
    }

    return false;
};
