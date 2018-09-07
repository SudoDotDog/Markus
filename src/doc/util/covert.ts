/**
 * @author WMXPY
 * @description Doc Util
 * @fileoverview Converter
 */

import { IExpressAssertionJSONType, IExpressRoute, EXPRESS_ASSERTION_TYPES_END, EXPRESS_ASSERTION_TYPES_UNION, ExpressAssertionType } from "../../service/interface";
import LanguageTextProcessor from "../../service/language";
import { IDocTableElement } from "../interface";

export const convertRouteToTemplate = (route: IExpressRoute, processor: LanguageTextProcessor, domain?: string) => {
    const template: IDocTableElement[] = [{
        name: 'Route',
        value: route.path,
    }, {
        name: 'Mode',
        value: route.mode,
    }, {
        name: 'Authorization',
        value: route.authorization ? 'YES' : 'NO',
    }];

    if (domain) {
        template.unshift({
            name: 'Path',
            value: domain,
        });
    }

    template.unshift({
        name: 'Description',
        value: route.doc ? processor.from(route.doc.description) : route.name,
    });

    if (route.postType) {
        template.push({
            name: 'Post format',
            value: route.postType,
        });
    }

    if (route.assertParam) {
        template.push({
            name: 'Parameter',
            value: convertAssertDocToUserFriendlyObject(route.assertParam),
        });
    }

    if (route.assertQuery) {
        template.push({
            name: 'Query',
            value: convertAssertDocToUserFriendlyObject(route.assertQuery),
        });
    }

    if (route.assertBody) {
        template.push({
            name: 'Body',
            value: convertAssertDocToUserFriendlyObject(route.assertBody),
        });
    }

    if (route.assertResponse) {
        template.push({
            name: 'Response',
            value: convertAssertDocToUserFriendlyObject(route.assertResponse),
        });
    }

    return template;
};

export const convertEndTypeRecursive = (current: ExpressAssertionType, layer: number = 0): any => {
    switch (current.type) {
        case EXPRESS_ASSERTION_TYPES_END.STRING:
        case EXPRESS_ASSERTION_TYPES_END.NUMBER:
        case EXPRESS_ASSERTION_TYPES_END.BOOLEAN:
        case EXPRESS_ASSERTION_TYPES_END.BUFFER:
        case EXPRESS_ASSERTION_TYPES_END.FILE:
        case EXPRESS_ASSERTION_TYPES_END.OBJECT_ID:
        case EXPRESS_ASSERTION_TYPES_END.TOOL_NAME:
        case EXPRESS_ASSERTION_TYPES_END.ANY:
            if (current.optional) {
                return current.type + ' (optional)';
            } else {
                return current.type;
            }
        case EXPRESS_ASSERTION_TYPES_UNION.ARRAY:
            let temp: string = '';
            if (current.split) {
                temp = `[${convertEndTypeRecursive(current.child, layer)}].join('${current.split}')`;
            } else {
                temp = `[${convertEndTypeRecursive(current.child, layer)}]`;
            }
            return temp + ' (optional)'
        case EXPRESS_ASSERTION_TYPES_UNION.OBJECT:
            const converted = convertObjectToHTMLFriendlyJson(convertAssertDocToUserFriendlyObject(current.child, layer + 1), 3, layer + 1);
            return converted;
        default:
    }
    return 'unknown';
}

export const convertAssertDocToUserFriendlyObject = (doc: IExpressAssertionJSONType, layer: number = 0): {
    [key: string]: string;
} => {
    const result: {
        [key: string]: string;
    } = {};
    for (let key of Object.keys(doc)) {
        const current = doc[key];
        result[key] = convertEndTypeRecursive(current, layer);
    }
    return result;
};

export const getSpace = (amount: number): string => {
    let spaces: string = '';
    for (let i = 0; i < amount; i++) {
        spaces += ' ';
    }
    return spaces;
}

export const convertObjectToHTMLFriendlyJson = (object: {
    [key: string]: string;
}, padding: number, layer?: number): string => {
    let result: string = JSON.stringify(object, null, padding + (layer ? layer * padding : 0));
    if (layer) {
        result = result
            .replace(/\n}/g, `\n${getSpace(layer * padding)}}`)
            .replace(/\n]/g, `\n${getSpace(layer * padding)}]`);
    }
    return result
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;')
        .replace(/"/g, '');
};
