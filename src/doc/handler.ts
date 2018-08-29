/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import * as Route from '../service/routes/import';
import DocRouteBuilder from './builder';

export const DocHandler: RequestHandler = (req: Request, res: Response): void => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b'),
        new Route.RouteGetImage('white not found image', '/w'),
    ]);

    console.log(req.originalUrl);
};

export const DocIndexHandler: RequestHandler = (req: Request, res: Response): void => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b'),
        new Route.RouteGetImage('white not found image', '/w'),
    ]);

    console.log(req);
};
