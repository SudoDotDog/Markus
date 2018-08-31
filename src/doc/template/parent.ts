/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Parent
 */

import { IDocTemplateRenderer } from '../interface';
import StyleBuilder from './style';

export default class DocOuterParentTemplateRenderer implements IDocTemplateRenderer {
    private _children: IDocTemplateRenderer[];

    public constructor(children?: IDocTemplateRenderer[]) {
        this._children = children || [];
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
                        ${this._children.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
                    </div>
                </div>
            </body>
        </html>
    `);
    }
}
