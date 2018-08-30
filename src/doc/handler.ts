/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc handler
 */

import { Request, RequestHandler, Response } from "express";
import { MarkusExtensionConfig } from "../markus";
import { installToolbox } from "../script/handlers/tool/install";
import { IExpressRoute } from "../service/interface";
import * as Route from '../service/routes/import';
import { SERVICE_ROUTE_UPLOAD_BUFFER_MODE } from "../service/routes/upload/upload_buffer";
import { IMarkusTool } from "../toolbox/toolbox";
import DocRouteBuilder from './builder';
import { IDocTemplateRenderer } from "./interface";
import DocTableCardTemplateRenderer from './template/components/tableCard';
import DocOuterParentTemplateRenderer from "./template/parent";

export const getBuiltDocRoute = (): DocRouteBuilder => {
    const docBuilder: DocRouteBuilder = new DocRouteBuilder();
    const tools: IMarkusTool[] = installToolbox(MarkusExtensionConfig);

    docBuilder.routes([
        new Route.RouteCompressByTag(),
        new Route.RouteFourOFour(),
        new Route.RouteGetImage('black not found image', '/b', 'Black'),
        new Route.RouteGetImage('white not found image', '/w', 'White'),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.DOC, '/v/buffer', 'Avatar'),
        new Route.RouteUploadByBuffer(SERVICE_ROUTE_UPLOAD_BUFFER_MODE.DOC, '/m/buffer', 'Image'),
        new Route.RouteGetTool(tools),
        new Route.RouteEstimateTool(tools),
        new Route.RouteExecuteTool(tools),
    ]);
    return docBuilder;
};

export const DocIndexHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log(req.originalUrl);
    const cards: IDocTemplateRenderer[] = getBuiltDocRoute().flush().map((route: IExpressRoute) => {
        return new DocTableCardTemplateRenderer('/a/' + route.name + '/?text=@E',
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
