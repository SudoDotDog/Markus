/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Parent
 */

import { IDocTemplateRenderer } from '../interface';
import StyleBuilder from './style';
import * as Fs from 'fs';
import * as Path from 'path';

export default class DocOuterParentTemplateRenderer implements IDocTemplateRenderer {
    private _children: IDocTemplateRenderer[];

    public constructor(children?: IDocTemplateRenderer[]) {
        this._children = children || [];
    }

    public build(): string {
        const leftStyle = new StyleBuilder()
            .add('width', '30%')
            .add('background-color', '#f5f5f5')
            .add('overflow-y', 'scroll')
            .add('padding', '15px')
            .add('min-width', '200px');
        const outerStyle = new StyleBuilder()
            .add('height', '100%')
            .add('overflow', 'hidden')
            .add('display', 'flex');
        const rightStyle = new StyleBuilder()
            .add('padding', '15px')
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
                        <div style="${rightStyle.build()}" id="content">
                        </div>
                    </div>
                </body>
                <style>
                    .card{box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);background-color:white;cursor:pointer;transition:0.3s all}
                    .card:hover{box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)}
                    body{margin:0;padding:0}
                    ::-webkit-scrollbar{width:0.5em;height:0.5em}
                    ::-webkit-scrollbar-thumb{background-color:#001F3F}
                    ::-webkit-scrollbar-track{background-color:#AAAAAA}
                </style>
                <script>
                    ${Fs.readFileSync(Path.resolve('assets', 'tableCardRough.js'))}
                </script>
            </html>
        `));
    }

    protected trim(target: string) {
        return target.replace(/ +\</g, '<');
    }
}
