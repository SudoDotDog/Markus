/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { MarkusExtensionConfig } from "../markus";
import { installToolbox } from "../script/handlers/tool/install";
import { IExpressRoute, IText } from "../service/interface";
import LanguageTextProcessor from '../service/language';
import * as Route from '../service/routes/import';
import { SERVICE_ROUTE_UPLOAD_BASE64_MODE } from "../service/routes/upload/upload_base64";
import { SERVICE_ROUTE_UPLOAD_BUFFER_MODE } from "../service/routes/upload/upload_buffer";
import { IMarkusTool } from "../toolbox/toolbox";
import DocRouteBuilder from './builder';
import { IDocTableElement, IDocTemplateRenderer } from "./interface";
import DocTableCardTemplateRenderer from './template/components/tableCard';
import DocOuterParentTemplateRenderer from "./template/parent";

export const getBuiltDocRoute = (): DocRouteBuilder => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    const tools: IMarkusTool[] = installToolbox(MarkusExtensionConfig);

    docBuilder.routes([
        new Route.RouteRoot(),
        new Route.RouteAuth(),
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('/b/:id', 'black not found image', 'Black'),
        new Route.RouteGetImage('/w/:id', 'white not found image', 'White'),
        new Route.RouteGetAvatar(),
        new Route.RouteGetImagesByTag(),
        new Route.RouteRenameTag(),
        new Route.RouteTagList(),
        new Route.RouteRiskyGetList(),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR_DOC, '/v/buffer', 'Avatar'),
        new Route.RouteUploadByBase64(SERVICE_ROUTE_UPLOAD_BASE64_MODE.AVATAR_DOC, '/v/base64', 'Avatar'),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE_DOC, '/m/buffer', 'Image'),
        new Route.RouteUploadByBase64(SERVICE_ROUTE_UPLOAD_BASE64_MODE.IMAGE_DOC, '/m/base64', 'Image'),
        new Route.RouteDeactivateImageById(),
        new Route.RouteDeactivateImagesByTag(),
        new Route.RouteRiskyEmptyDatabase(),
        new Route.RouteGetTool(tools),
        new Route.RouteEstimateTool(tools),
        new Route.RouteExecuteTool(tools),
    ]);
    return docBuilder;
};

export const verifyLanguage = (language: string | undefined): boolean => {
    if (!language) {
        return false;
    }

    if (language.toUpperCase() === 'EN' ||
        language.toUpperCase() === 'ZH') {
        return true;
    }
    return false;
};

export const createDocIndex = (language: keyof IText): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);
    const cards: IDocTemplateRenderer[] = getBuiltDocRoute().flush().map((route: IExpressRoute) => {
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

        return new DocTableCardTemplateRenderer('/a/' + route.name + '/?text=@E',
            route.doc ? processor.from(route.doc.name) : route.name,
            template,
            route.specialMark || []);
    });

    const outer: IDocTemplateRenderer = new DocOuterParentTemplateRenderer(cards);
    console.log(outer.build().length);
    return outer.build();
};

export const convertObjectToHTMLFriendlyJson = (object: any): string => {
    return JSON.stringify(object, null, 3)
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;')
        .replace(/&nbsp;&nbsp;&nbsp;"/g, '&nbsp;&nbsp;&nbsp;')
        .replace(/":/g, ':');
};
