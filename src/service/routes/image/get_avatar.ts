/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Avatar
 */

import { Request, RequestHandler, Response } from "express";
import { IFileModel } from "../../../database/model/file";
import * as Direct from "../../../direct/import";
import { Icon } from "../../../icon/icon";
import { fileBuilder } from "../../../util/data/path";
import { rummageLongTermTempFileOrCreateWithLazyLoadContent } from "../../../util/image";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../../lodgeable";

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
    public readonly assertParam: IExpressAssertionJSONType = {
        text: {
            type: EXPRESS_ASSERTION_TYPES_END.STRING,
            optional: true,
        },
    };
    public readonly assertQuery: IExpressAssertionJSONType = {
        id: { type: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID },
    };

    public constructor() {
        super();
        this.handler = this.handler.bind(this);
        this.getCreateAvatarFunction = this.getCreateAvatarFunction.bind(this);
        this.stack = [
            this.handler,
        ];
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const avatar: string = req.params.id;
            const text: string | undefined = req.query.text;
            const callback: IFileModel | null = await Direct.Avatar.rummageFileByAvatar(avatar);
            if (callback) {
                const filepath: string = fileBuilder(callback.folder, callback.filename);
                res.agent.smartFileSend(filepath);
            } else {
                const path = rummageLongTermTempFileOrCreateWithLazyLoadContent(
                    'Avatar-' + avatar, 'svg',
                    this.getCreateAvatarFunction(avatar, text));
                res.agent.smartFileSend(path);
            }
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected getCreateAvatarFunction(avatar: string, text?: string): () => string {
        return (): string => {
            if (text) {
                if (text === '@E') {
                    return Icon(avatar, '');
                } else {
                    return Icon(avatar, text);
                }
            } else {
                return Icon(avatar);
            }
        };
    }
}
