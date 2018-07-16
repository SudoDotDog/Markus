/**
 * @author WMXPY
 * @fileoverview G Handler
 */

import { ObjectId, ObjectID } from "bson";
import { Request, Response } from "express";
import * as Controller from '../../db/controller/import';
import { IImageCallback } from "../../db/interface/image";
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

export const imageGetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const image: IImageCallback = await Controller.Image.getImageById(id);
        res.status(200).sendFile(image.path);
    } catch (err) {
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
    }
    return;
};

export const fourOFourHandler = (req: Request, res: Response): void => {
    res.status(404).send({
        status: RESPONSE.FAILED,
        error: error(ERROR_CODE.FOUR_O_FOUR_NOT_FOUND),
    });
};
