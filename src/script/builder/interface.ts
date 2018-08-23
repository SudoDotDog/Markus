export interface IExpressBuilder {
    route: (route: IExpressRoute) => IExpressBuilder;
    routes: (routes: IExpressRoute[]) => IExpressBuilder;
    flush: () => any;
}

export interface IExpressRoute {
    readonly path: string;
    readonly stack: any[];
    readonly mode: any;
}
