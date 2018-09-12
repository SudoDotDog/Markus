/**
 * @author WMXPY
 * @description Mock Route
 */

import { Request, RequestHandler, Response } from "express";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../src/service/interface';
import LodgeableExpressRoute from "../../src/service/routes/lodgeable";

export default class MockRoute extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Mock-Route^Mock-Route';
    public readonly path: string = '/mock';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Mock name',
        },
        description: {
            EN: 'Mock description',
        },
    };
    public readonly assertQuery: IExpressAssertionJSONType = {
        tagId: { type: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID },
    };

    public constructor() {
        super();
        this.handler = this.handler.bind(this);

        this.stack = [this.handler];
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            res.agent.add('test', 'test');
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
