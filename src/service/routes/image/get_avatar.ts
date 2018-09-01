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
import { createTempFile } from "../../../util/image";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteGetAvatarById implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Get-Avatar-By-Id';
    public readonly path: string = '/a/:id';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
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
        id: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID,
    };

    public available() {
        return true;
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
                let tempFilePath: string;
                if (text) {
                    if (text === '@E') {
                        tempFilePath = createTempFile(Icon(avatar, ''), 'svg');
                    } else {
                        tempFilePath = createTempFile(Icon(avatar, text), 'svg');
                    }
                } else {
                    tempFilePath = createTempFile(Icon(avatar), 'svg');
                }
                res.agent.smartFileSend(tempFilePath);
            }
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
