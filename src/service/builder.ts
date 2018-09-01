/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Class
 */

import * as express from "express";
import { MarkusExtensionConfig } from "../markus";
import { error, ERROR_CODE, handlerError } from "../util/error/error";
import Fork from '../util/struct/fork';
import { IExpressBuilder, IExpressExtension, IExpressHeader, IExpressRoute, ROUTE_MODE } from "./interface";

export const internalExpressBuilderFlushHandler: express.RequestHandler = (req: express.Request, res: express.Response): void => {
    try {
        if (res.agent) {
            res.agent.send();
        } else {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export default class ExpressBuilder implements IExpressBuilder {
    private _routes: Fork<IExpressRoute>;
    private _extensions: Fork<IExpressExtension>;
    private _app: express.Express;
    private _headers: IExpressHeader[];

    public constructor(app?: express.Express) {
        this._routes = new Fork<IExpressRoute>();
        this._extensions = new Fork<IExpressExtension>();
        this._headers = [];

        if (app) {
            this._app = app;
        } else {
            this._app = express();
        }

        this._routeMount = this._routeMount.bind(this);
        this._extensionMount = this._extensionMount.bind(this);
        this._extensionPreMount = this._extensionPreMount.bind(this);
    }

    public get app(): express.Express {
        return this._app;
    }

    public route(route: IExpressRoute): IExpressBuilder {
        const exist: boolean = this._routes.has((element: IExpressRoute) => {
            return (element.path === route.path)
                && (element.mode === route.mode);
        });
        if (exist) {
            throw error(ERROR_CODE.INTERNAL_EXPRESS_BUILDER_ROUTE_CANT_BE_SAME);
        }

        this._routes.add(route);
        return this;
    }

    public routes(routes: IExpressRoute[]): IExpressBuilder {
        for (let route of routes) {
            this.route(route);
        }
        return this;
    }

    public use(extension: IExpressExtension): IExpressBuilder {
        const exist: boolean = this._extensions.has((element: IExpressExtension) => {
            return element.name === extension.name;
        });
        if (exist) {
            throw error(ERROR_CODE.INTERNAL_EXPRESS_BUILDER_EXTENSION_NAME_CANT_BE_SAME);
        }

        this._extensions.add(extension);
        if (extension.preMount) {
            this._extensionPreMount(extension);
        }

        return this;
    }

    public header(name: string, value: string): IExpressBuilder {
        this._headers.push({
            name,
            value,
        });
        return this;
    }

    public flush() {
        this._extensions.list.forEach(this._extensionMount);
        this._routes.list.forEach(this._routeMount);

        return this._app;
    }

    protected _extensionPreMount(extension: IExpressExtension) {
        if (!extension.available()) {
            return;
        }
        if (!extension.preMount) {
            throw error(ERROR_CODE.INTERNAL_EXPRESS_BUILDER_PRE_MOUNT_CONFLICT);
        }

        extension.install(this._app);
    }

    protected _extensionMount(extension: IExpressExtension) {
        if (!extension.available()) {
            return;
        }
        if (extension.preMount) {
            return;
        }

        extension.install(this._app);
    }

    protected _routeMount(route: IExpressRoute) {
        if (!route.available()) {
            return;
        }

        const handlers: express.RequestHandler[] = [];

        if (route.veryBefore) {
            handlers.push(...route.veryBefore);
        }
        if (route.prepare) {
            handlers.push(...MarkusExtensionConfig.middleware.prepares);
        }
        if (route.authorization) {
            handlers.push(...MarkusExtensionConfig.middleware.permissions);
        }

        handlers.push(...route.stack);

        if (route.after) {
            handlers.push(...MarkusExtensionConfig.middleware.after);
        }

        handlers.push(internalExpressBuilderFlushHandler);

        switch (route.mode) {
            case ROUTE_MODE.ALL:
                this._app.all(route.path, ...handlers);
                break;
            case ROUTE_MODE.DELETE:
                this._app.delete(route.path, ...handlers);
                break;
            case ROUTE_MODE.GET:
                this._app.get(route.path, ...handlers);
                break;
            case ROUTE_MODE.POST:
                this._app.post(route.path, ...handlers);
                break;
            case ROUTE_MODE.PUT:
                this._app.put(route.path, ...handlers);
                break;
            default:
                throw error(ERROR_CODE.INTERNAL_EXPRESS_AGENT);
        }
    }
}
