/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Parent
 */

import { IDocTemplateRenderer } from '../interface';
import StyleBuilder from './style';

export default class DocOuterParentTemplateRenderer implements IDocTemplateRenderer {
    private _childs: IDocTemplateRenderer[];

    public constructor(childs?: IDocTemplateRenderer[]) {
        this._childs = childs || [];
    }

    public build() {
        const outerStyle = new StyleBuilder()
            .add('margin', '30px');

        return (`
        <html>
            <head>
                <title>Markus - Document</title>
            </head>
            <body>
                <div style="${outerStyle.build()}">
                    <h1>Markus Documentation</h1>
                    <div>
                        ${this._childs.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
                    </div>
                </div>
            </body>
        </html>
    `);
    }
}
