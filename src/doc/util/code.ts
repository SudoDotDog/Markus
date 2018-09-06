/**
 * @author WMXPY
 * @description Doc Util
 * @fileoverview Code
 */

import * as Fs from "fs";
import * as Path from 'path';
import { IExpressRoute, EXPRESS_ASSERTION_TYPES_END, EXPRESS_ASSERTION_TYPES_UNION, IExpressAssertionJSONType } from "../../service/interface";

export const nodeMarkusFormData = (domain: string, route: IExpressRoute): string => {
    const append: string[] = [];
    const parseNotEnd = (current: any) => {
        switch (current.type) {
            case EXPRESS_ASSERTION_TYPES_END.NUMBER:
                append.push(``);
                break;
        }
    }
    const parseUnion = (current: any) => {
        console.log(current);
        if (current.child) {
            console.log(current);
        }
    };

    if (route.assertBody) {
        for (let i of Object.keys(route.assertBody)) {
            const current = route.assertBody[i]
            switch (current.type) {
                case EXPRESS_ASSERTION_TYPES_END.FILE:
                    append.push(
                        `const extName = path.extname(original);`,
                        `form.append('${i}': buffer, {`,
                        `    filename: original,`,
                        `    contentType: 'image/' + extName.substring(1, extName.length),`,
                        `});`,
                    );
                    break;
                default:
                    if (oneOfUnion((current as any).type)) {
                        parseUnion(current);
                    } else {
                        parseNotEnd(current)
                    }
            }
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

export const fetchMarkusFormData = () => {
    return null;
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
}
