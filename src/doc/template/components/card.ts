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

    public build(): string {
        const outerStyle = new StyleBuilder()
            .add('width', 'auto')
            .add('margin-top', '30px')
            .add('margin-bottom', '30px')
            .add('padding', '15px')
            .add('border', '1px solid black');
        const textStyle = new StyleBuilder()
            .add('font-size', '26px')
            .add('font-weight', 'bold');

        return (`
            <div style="${outerStyle.build()}">
                <div>
                    <img src="${this._icon}" width="100px" height="100px" border="1px solid black">
                    <span style="${textStyle.build()}">${this._title}</span>
                </div>
                ${this._content.join('<br>')}
            </div>
        `);
    }
}
