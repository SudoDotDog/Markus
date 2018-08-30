/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Table Card
 */

import { IDocTemplateRenderer } from '../../interface';
import StyleBuilder from '../style';

export default class DocTableCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _title: string;
    private _content: Array<{
        left: string;
        right: string;
    }>;

    public constructor(icon: string, title: string, content: Array<{
        left: string;
        right: string;
    }>) {
        this._icon = icon;
        this._title = title;
        this._content = content;
    }

    public build() {
        const outerStyle = new StyleBuilder()
            .add('width', 'auto')
            .add('margin-top', '30px')
            .add('margin-bottom', '30px')
            .add('padding', '15px')
            .add('border', '1px solid black');
        const tableStyle = new StyleBuilder()
            .add('border', '1px solid black')
            .add('width', '100%')
            .add('border-collapse', 'collapse');
        const textStyle = new StyleBuilder()
            .add('font-size', '26px')
            .add('font-weight', 'bold');

        return (`
        <div style="${outerStyle.build()}">
            <div>
                <img src="${this._icon}" width="100px" height="100px" border="1px solid black">
                <span style="${textStyle.build()}">${this._title}</span>
            </div>
            <table style="${tableStyle.build()}">
                <tbody>
                    ${this._content.map(this.getRow).join('')}
                </tbody>
            </table>
        </div>
    `)
    }

    protected getRow(row: {
        left: string;
        right: string;
    }) {
        const leftStyle = new StyleBuilder()
            .add('border', '1px solid black')
            .add('width', '25%')
            .add('padding', '3px')
            .add('padding-right', '5px')
            .add('font-weight', 'bold')
            .add('text-align', 'right');
        const rightStyle = new StyleBuilder()
            .add('padding', '3px')
            .add('padding-left', '5px')
            .add('border', '1px solid black');

        return `
            <tr style="${rightStyle.build()}">
                <td style="${leftStyle.build()}">
                    ${row.left}
                </td>
                <td style="${rightStyle.build()}">
                    ${row.right}
                </td>
            </tr>
        `;
    }
}
