/**
 * @author WMXPY
 * @fileoverview Mix Controller
 */

import { ImageModel } from "../model/image";
import { TagModel } from "../model/tag";

export const emptyDatabase = async (): Promise<void> => {
    await ImageModel.remove({});
    await TagModel.remove({});
    return;
};
