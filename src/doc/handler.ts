/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import { IExpressRoute } from "../service/interface";
import * as Route from '../service/routes/import';
import DocRouteBuilder from './builder';
import DocCardTemplateRenderer from './template/components/card';
import { IDocTemplateRenderer } from "./interface";
import DocOuterParentTemplateRenderer from "./template/parent";

export const getBuiltDocRoute = (): DocRouteBuilder => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b'),
        new Route.RouteGetImage('white not found image', '/w'),
    ]);
    return docBuilder;
};

export const DocIndexHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log(req.originalUrl);
    const cards: IDocTemplateRenderer[] = getBuiltDocRoute().list.map((route: IExpressRoute)=>{
        return new DocCardTemplateRenderer('/a/' + route.name,
        route.doc ? route.doc.name.en : route.name,
        [
            route.doc ? route.doc.description.en : route.name,
            route.path,
            route.mode,
        ]);
    });

    const outer: IDocTemplateRenderer = new DocOuterParentTemplateRenderer(cards);
    res.send(outer.build());
};
