/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Parent
 */

import * as Fs from 'fs';
import * as Path from 'path';
import { IDocTemplateRenderer } from '../interface';
import StyleBuilder from './style';

export default class DocOuterParentTemplateRenderer implements IDocTemplateRenderer {
    private _children: IDocTemplateRenderer[];

    public constructor(children?: IDocTemplateRenderer[]) {
        this._children = children || [];
    }

    public build(): string {
        const leftStyle = new StyleBuilder()
            .add('background-color', '#f5f5f5')
            .add('overflow-y', 'scroll')
            .add('overflow-x', 'hidden')
            .add('padding', '15px')
            .add('padding-left', '8px');
        const outerStyle = new StyleBuilder()
            .add('height', '100%')
            .add('overflow', 'hidden')
            .add('display', 'flex');
        const rightStyle = new StyleBuilder()
            .add('padding', '15px')
            .add('overflow', 'auto')
            .add('flex', '1');

        return (this.trim(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Markus - Document</title>
                </head>
                <body>
                    <div style=${outerStyle.build()}>
                        <div style="${leftStyle.build()}" class="left">
                            <h1 class="title">Markus</h1>
                            <h1 class="small-title">M</h1>
                            <div>
                                ${this._children.map((renderer: IDocTemplateRenderer) => renderer.build()).join('')}
                            </div>
                            <div style="text-align:center">
                                <a href="https://github.com/sudo-dog/markus">v${global.Markus.Environment.version}</a>
                            </div>
                        </div>
                        <div style="${rightStyle.build()}" id="content">
                            Select an api to see details
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
                    pre.prettyprint{border:0}
                    .left{width:20%;min-width:300px}
                    .title,.small-title{text-align:center}
                    .small-title{display:none;color:#001F3F}
                    .title{display:block;color:#001F3F;padding-top:30px}
                    @media only screen and (max-width: 768px){
                        .card-content{display:none}.card{width:80px}.left{width:90px;min-width:90px}
                        .title{display:none}.small-title{display:block}
                    }
                </style>
                <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
                <script>
                    ${Fs.readFileSync(Path.resolve('assets', 'code', 'doc.js'))}
                </script>
            </html>
        `));
    }

    protected trim(target: string) {
        return target.replace(/ +\</g, '<');
    }
}
