/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import { IExpressRoute } from "../service/interface";
import * as Route from '../service/routes/import';
import DocRouteBuilder from './builder';
import DocTableCardTemplateRenderer from './template/components/tableCard';
import { IDocTemplateRenderer } from "./interface";
import DocOuterParentTemplateRenderer from "./template/parent";

export const getBuiltDocRoute = (): DocRouteBuilder => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b'),
        new Route.RouteGetImage('white not found image', '/w'),
        new Route.RouteUploadAvatarByBuffer(true),
    ]);
    return docBuilder;
};

export const DocIndexHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log(req.originalUrl);
    const cards: IDocTemplateRenderer[] = getBuiltDocRoute().flush().map((route: IExpressRoute) => {
        return new DocTableCardTemplateRenderer('/a/' + route.name,
            route.doc ? route.doc.name.en : route.name,
            [
                {
                    left: 'Description',
                    right: route.doc ? route.doc.description.en : route.name,
                },
                {
                    left: 'path',
                    right: route.path,
                },
                {
                    left: 'mode',
                    right: route.mode,
                }
            ]);
    });

    const outer: IDocTemplateRenderer = new DocOuterParentTemplateRenderer(cards);
    res.send(outer.build());
};
