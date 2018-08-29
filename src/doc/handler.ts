/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import { IExpressRoute } from "../service/interface";
import * as Route from '../service/routes/import';
import DocRouteBuilder from './builder';
import { docTemplateComponentCard } from './template/components/card';

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

export const DocHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log(req.originalUrl);
    res.send(getBuiltDocRoute().list.map((route: IExpressRoute) => {
        return docTemplateComponentCard(route.name, route.doc ? route.doc.name.en : route.name, route.doc ? route.doc.description.en : route.name)
    }).join(''));
};

export const DocIndexHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log(req.originalUrl);
    res.send(getBuiltDocRoute().list.map((route: IExpressRoute) => {
        return docTemplateComponentCard('/a/'+route.name, route.doc ? route.doc.name.en : route.name, route.doc ? route.doc.description.en : route.name)
    }).join(''));
};
