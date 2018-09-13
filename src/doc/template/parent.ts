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
                            <div class="title">Markus</div>
                            <div class="small-title">M</div>
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
                <style>${this.getGlobalStyles()}</style>
                <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
                <script>
                    ${Fs.readFileSync(Path.resolve('assets', 'code', 'doc.js'))}
                </script>
            </html>
        `));
    }

    protected getGlobalStyles(): string {
        return [
            `body{margin:0;padding:0}`,
            `.card{box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);background-color:white;cursor:pointer;transition:0.3s all}`,
            `.card:hover{box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)}`,
            `::-webkit-scrollbar{width:0.5em;height:0.5em}`,
            `::-webkit-scrollbar-thumb{background-color:#001F3F}`,
            `::-webkit-scrollbar-track{background-color:#AAAAAA}`,
            `pre.prettyprint{border:0}`,
            `.left{width:20%;min-width:300px}`,
            [
                `.title{text-align:right;display:block;font-size:3em;`,
                `color:white;background-color:#001F3F;padding-left:1em;padding-top:0.8em;`,
                `width:4em;padding-right:0.3em;padding-bottom:0.1em;margin:auto;margin-top:30px;margin-bottom:45px;`,
                `box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)`,
                `}`,
            ].join(''),
            [
                `.small-title{display:none;color:#001F3F;text-align:center;`,
                `text-shadow:0 2px 4px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.24);`,
                `font-size:3em;margin-top:15px;margin-bottom:25px;font-weight:bold;padding:5px}`,
            ].join(''),
            [
                `@media only screen and (max-width: 768px){`,
                `.card-content{display:none}.card{width:80px}.left{width:90px;min-width:90px}`,
                `.title{display:none}.small-title{display:block}`,
                `}`,
            ].join(''),
        ].join('');
    }

    protected trim(target: string) {
        return target.replace(/ +\</g, '<');
    }
}
