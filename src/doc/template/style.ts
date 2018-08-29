/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Style Builder
 */

import UniqueArray from "../../util/struct/uniqueArray";
import { IDocStyle } from "../interface";

export default class StyleBuilder {
    private _styles: UniqueArray<IDocStyle>;

    public constructor() {
        this._styles = new UniqueArray<IDocStyle>();
    }

    public add(name: string, value: string): StyleBuilder {
        this._styles.push({
            name,
            value,
        });
        return this;
    }

    public build(): string {
        const styles: IDocStyle[] = this._styles.list;
        return styles.map((style: IDocStyle) => {
            return `${style.name}:${style.value}`;
        }).join(';');
    }
}
