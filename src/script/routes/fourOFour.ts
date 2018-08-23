import { IExpressRoute } from '../builder/interface';

export default class RouteAllFourOFour implements IExpressRoute {
    public readonly path: string = '*';
    public readonly route: ROUTE_MODE = ROUTE_MODE.ALL;
    public readonly stack: any[] = [];
    public readonly mode: null;
    public readonly authorization: boolean = false;
}
