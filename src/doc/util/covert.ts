/**
 * @author WMXPY
 * @description Doc Util
 * @fileoverview Converter
 */

import { IExpressRoute } from "../../service/interface";
import LanguageTextProcessor from "../../service/language";
import { IDocTableElement } from "../interface";

export const convertRouteToTemplate = (route: IExpressRoute, processor: LanguageTextProcessor) => {
    const template: IDocTableElement[] = [{
        name: 'description',
        value: route.doc ? processor.from(route.doc.description) : route.name,
    }, {
        name: 'path',
        value: route.path,
    }, {
        name: 'mode',
        value: route.mode,
    }, {
        name: 'authorization',
        value: route.authorization ? 'YES' : 'NO',
    }];

    if (route.postType) {
        template.push({
            name: 'format',
            value: route.postType,
        });
    }

    if (route.assertParam) {
        template.push({
            name: 'parameter',
            value: convertObjectToHTMLFriendlyJson(route.assertParam),
        });
    }

    if (route.assertQuery) {
        template.push({
            name: 'query',
            value: convertObjectToHTMLFriendlyJson(route.assertQuery),
        });
    }

    if (route.assertBody) {
        template.push({
            name: 'body',
            value: convertObjectToHTMLFriendlyJson(route.assertBody),
        });
    }

    if (route.assertResponse) {
        template.push({
            name: 'response',
            value: convertObjectToHTMLFriendlyJson(route.assertResponse),
        });
    }

    return template;
};

export const convertAssertDocToUserFriendlyJsonString = (doc: any): string => {
    
};

export const convertObjectToHTMLFriendlyJson = (object: any): string => {
    return JSON.stringify(object, null, 3)
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;')
        .replace(/&nbsp;&nbsp;&nbsp;"/g, '&nbsp;&nbsp;&nbsp;')
        .replace(/":/g, ':');
};
