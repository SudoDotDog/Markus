/**
 * @author WMXPY
 * @description Cache
 * @fileoverview Tag Manager
 */

import * as Controller from '../../../database/controller/import';
import { ITagModel } from "../../../database/model/tag";
import { sleep } from './wait';
import Queue from '../../struct/queue';

export class TagCacheManager {
    private _cache: Queue<string, ITagModel>;
    private _lock: boolean;

    public constructor() {
        this._cache = new Queue<string, ITagModel>(50);
        this._lock = false;
    }

    public async rummage(name: string): Promise<ITagModel> {
        if (this._lock) {
            await sleep(20);
            return this.rummage(name);
        } else {
            return this._rummage(name);
        }
    }

    protected async _rummage(name: string): Promise<ITagModel> {
        this._lock = true;
        if (this._cache.has(name)) {
            const cache: ITagModel = (this._cache.get(name) as ITagModel);
            this._lock = false;
            return cache;
        } else {
            const existTag: ITagModel | null = await Controller.Tag.rummageTag(name);
            this._lock = false;
            if (existTag) {
                this._cache.add(name, existTag);
                return existTag;
            } else {
                const newTag: ITagModel = Controller.Tag.createTagWithOutSave({ name });
                this._cache.add(name, newTag);
                setImmediate(async () => {
                    await newTag.save();
                });
                return newTag;
            }
        }
    }
}
