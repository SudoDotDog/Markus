/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Avatar
 */

import { Request, RequestHandler, Response } from "express";
import { IFileModel } from "../../../database/model/file";
import * as Direct from "../../../direct/import";
import { Icon } from "../../../plugin/icon/icon";
import { IIconConfig } from "../../../plugin/icon/interface";
import { fileBuilder } from "../../../util/data/path";
import { rummageLongTermTempFileOrCreateWithLazyLoadContent } from "../../../util/image";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export default class RouteGetAvatarById extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Get-Avatar-By-Id';
    public readonly path: string = '/a/:id';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Get avatar',
        },
        description: {
            EN: 'Get avatar from id, return default avatar if wanted avatar is not settled',
        },
    };
    public readonly assertQuery: IExpressAssertionJSONType = {
        text: {
            type: EXPRESS_ASSERTION_TYPES_END.STRING,
            optional: true,
        },
        center: {
            type: EXPRESS_ASSERTION_TYPES_END.BOOLEAN,
            optional: true,
        },
        round: {
            type: EXPRESS_ASSERTION_TYPES_END.BOOLEAN,
            optional: true,
        },
        thin: {
            type: EXPRESS_ASSERTION_TYPES_END.BOOLEAN,
            optional: true,
        },
        larger: {
            type: EXPRESS_ASSERTION_TYPES_END.BOOLEAN,
            optional: true,
        },
    };
    public readonly assertParam: IExpressAssertionJSONType = {
        id: {
            type: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID,
        },
    };

    public constructor() {
        super();
        this.handler = this.handler.bind(this);

        this.createAvatarHashFileName = this.createAvatarHashFileName.bind(this);
        this.getCreateAvatarFunction = this.getCreateAvatarFunction.bind(this);
        this.getIconConfigFromQuery = this.getIconConfigFromQuery.bind(this);

        this.stack = [
            this.handler,
        ];
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const avatar: string = req.params.id;
            const query: any = req.query;

            const callback: IFileModel | null = await Direct.Avatar.rummageFileByAvatar(avatar);
            if (callback) {
                const filepath: string = fileBuilder(callback.folder, callback.filename);
                res.agent.smartFileSend(filepath);
            } else {
                const config = this.getIconConfigFromQuery(query);
                const path = rummageLongTermTempFileOrCreateWithLazyLoadContent(
                    this.createAvatarHashFileName(avatar, config),
                    'svg',
                    this.getCreateAvatarFunction(avatar, config),
                );

                res.agent.smartFileSend(path);
            }
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected getIconConfigFromQuery(query: any): IIconConfig {
        const config: IIconConfig = {
            display: query.text === '@E' ? '' : query.text,
            center: query.center ? true : false,
            circle: query.round ? true : false,
            thin: query.thin ? true : false,
            larger: query.larger ? true : false,
        };
        return config;
    }

    protected createAvatarHashFileName(name: string, config: IIconConfig): string {
        let result: string = 'Avatar-' + name;
        const buffer: string[] = [];
        for (let key of Object.keys(config)) {
            const value: string = (config as any)[key as any];
            if (!value) {
                continue;
            }
            buffer.push(`${key}-${value}`);
        }
        return result + buffer.join(';');
    }

    protected getCreateAvatarFunction(avatar: string, config: IIconConfig): () => string {
        return (): string => {
            return Icon(avatar, config);
        };
    }
}
