/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import DocRouteBuilder from './builder';
import * as Route from '../service/routes/import';

export const DocHanlder: RequestHandler = (req: Request, res: Response): void => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b'),
        new Route.RouteGetImage('white not found image', '/w'),
    ]);
    
    console.log(req);
};
