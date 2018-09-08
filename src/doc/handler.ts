/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { IExpressRoute, IText } from "../service/interface";
import LanguageTextProcessor from '../service/language';
import * as Route from '../service/routes/import';
import { SERVICE_ROUTE_UPLOAD_BASE64_MODE } from "../service/routes/upload/upload_base64";
import { SERVICE_ROUTE_UPLOAD_BUFFER_MODE } from "../service/routes/upload/upload_buffer";
import { error, ERROR_CODE } from "../util/error/error";
import DocRouteBuilder from './builder';
import { IDocTemplateRenderer } from "./interface";
import DocSmallCardTemplateRenderer from './template/components/small_card';
import DocTableCardTemplateRenderer from './template/components/table_card';
import DocOuterParentTemplateRenderer from "./template/parent";

export const getBuiltDocRoute = (): DocRouteBuilder => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();

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
        new Route.RouteTagAdvancedList(),
        new Route.RouteRiskyGetList(),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR_DOC, '/v/buffer', 'Avatar'),
        new Route.RouteUploadByBase64(SERVICE_ROUTE_UPLOAD_BASE64_MODE.AVATAR_DOC, '/v/base64', 'Avatar'),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE_DOC, '/m/buffer', 'Image'),
        new Route.RouteUploadByBase64(SERVICE_ROUTE_UPLOAD_BASE64_MODE.IMAGE_DOC, '/m/base64', 'Image'),
        new Route.RouteDeactivateImageById(),
        new Route.RouteDeactivateImagesByTag(),
        new Route.RouteRiskyEmptyDatabase(),
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

export const createSubDocIndex = (name: string, language: keyof IText, url: string): string => {
    const routes: IExpressRoute[] = getBuiltDocRoute().flush();
    let route: IExpressRoute | null = null;
    for (let i of routes) {
        if (i.name === name) {
            route = i;
        }
    }
    if (!route) {
        throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
    }
    const card: IDocTemplateRenderer = new DocTableCardTemplateRenderer(route, language, url);

    return card.build();
};

export const createDocIndex = (language: keyof IText): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);
    const cards: IDocTemplateRenderer[] = getBuiltDocRoute().flush().map((route: IExpressRoute) => {
        return new DocSmallCardTemplateRenderer(
            route.name,
            route.doc ? processor.from(route.doc.name) : route.name,
            route.path,
            route.specialMark || [],
        );
    });

    const outer: IDocTemplateRenderer = new DocOuterParentTemplateRenderer(cards);
    return outer.build();
};


