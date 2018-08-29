/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Parent
 */

import { IDocTemplateRenderer } from '../interface';

export default class DocOuterParentTemplateRenderer implements IDocTemplateRenderer {
    private _childs: IDocTemplateRenderer[];

    public constructor(childs?: IDocTemplateRenderer[]) {
        this._childs = childs || [];
    }

    public build() {
        return (`
        <html>
            <head>
                <title>Doc</title>
            </head>
            <body>
                ${this._childs.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
            </body>
        </html>
    `)
    }
}
