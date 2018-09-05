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

    public build(): string {
        const leftStyle = new StyleBuilder()
            .add('flex', '1')
            .add('min-width', '300px');
        const outerStyle = new StyleBuilder()
            .add('display', 'flex');
        const rightStyle = new StyleBuilder()
            .add('flex', '1');
        return (this.trim(`
            <html>
                <head>
                    <title>Markus - Document</title>
                </head>
                <body>
                    <div style=${outerStyle.build()}>
                        <div style="${leftStyle.build()}">
                            <h1>Markus Documentation</h1>
                            <div>
                                ${this._children.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
                            </div>
                        </div>
                        <div style="${rightStyle.build()}">
                            <code>
                                for(let i = 0;i<100;i++){
                                    123
                                }
                            </code>
                        </div>
                    </div>
                </body>
            </html>
        `));
    }

    protected trim(target: string){
        return target.replace(/ +\</g, '<');
    }  
}
