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
                <title>Markus - Document</title>
            </head>
            <body>
                <h1>Markus Documentation</h1>
                <div>
                    ${this._childs.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
                </div>
            </body>
        </html>
    `)
    }
}
