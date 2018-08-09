/**
 * @author WMXPY
 * @description Cache
 * @fileoverview Tag Manager
 */

import * as Controller from '../../../database/controller/import';
import { ITagModel } from "../../../database/model/tag";

export class TagCacheManager {
    private _cache: Map<string, ITagModel>;
    private _timeout: number;

    public constructor(timeout: number = 100) {
        this._cache = new Map<string, ITagModel>();
        this._timeout = timeout;
    }

    public async rummage(name: string): Promise<ITagModel> {
        if (this._cache.has(name)) {
            const cache: ITagModel = this._cache.get(name);
            return cache;
        } else {
            const existTag: ITagModel | null = await Controller.Tag.rummageTag(name);
            if (existTag) {
                this._cache.set(name, existTag);
                return existTag;
            } else {
                const newTag: ITagModel = Controller.Tag.createTagWithOutSave({ name });
                this._cache.set(name, newTag);
                setTimeout(async () => {
                    await newTag.save();
                }, this._timeout);
                return newTag;
            }
        }
    }
}
