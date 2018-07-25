/**
 * @author WMXPY
 * @fileoverview Mix Controller
 */

import { AvatarModel } from "../model/avatar";
import { FileModel } from "../model/file";
import { ImageModel } from "../model/image";
import { TagModel } from "../model/tag";

export const emptyDatabase = async (): Promise<void> => {
    await AvatarModel.remove({});
    await ImageModel.remove({});
    await TagModel.remove({});
    await FileModel.remove({});
    return;
};
