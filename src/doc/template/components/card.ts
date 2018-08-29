/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Card
 */

import { IDocTemplateRenderer } from '../../interface';
import StyleBuilder from '../style';

export default class DocCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _title: string;
    private _content: string[];

    public constructor(icon: string, title: string, content: string[]) {
        this._icon = icon;
        this._title = title;
        this._content = content;
    }

    public build() {
        const outerStyle = new StyleBuilder()
            .add('width', 'auto')
            .add('margin', '30px')
            .add('padding', '15px')
            .add('border', '1px solid black');

        return (`
        <div style="${outerStyle.build()}">
            <div>
                <img src="${this._icon}" width="100px" height="100px">
                ${this._title}
            </div>
            <hr>
            ${this._content.join('<br>')}
        </div>
    `)
    }
}
