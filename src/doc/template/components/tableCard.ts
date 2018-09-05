/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Table Card
 */

import { EXPRESS_SPECIAL_MARK } from '../../../service/interface';
import { IDocTableElement, IDocTemplateRenderer } from '../../interface';
import StyleBuilder from '../style';

export default class DocTableCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _title: string;
    private _content: IDocTableElement[];
    private _marks: EXPRESS_SPECIAL_MARK[];

    public constructor(icon: string, title: string, content: IDocTableElement[], marks: EXPRESS_SPECIAL_MARK[]) {
        this._icon = icon;
        this._title = title;
        this._content = content;
        this._marks = marks;
    }

    public build(): string {
        const outerStyle = new StyleBuilder()
            .add('width', 'auto')
            .add('margin-top', '30px')
            .add('margin-bottom', '30px')
            .add('padding', '15px')
        const tableStyle = new StyleBuilder()
            .add('border', '1px solid black')
            .add('width', '100%')
            .add('border-collapse', 'collapse');
        const textStyle = new StyleBuilder()
            .add('font-size', '26px')
            .add('font-weight', 'bold');

        return (`
            <div style="${outerStyle.build()}">
                <div style="display:flex;align-items:flex-end">
                    <div style="width:100px">
                        <img src="${this._icon}" width="100px" height="100px">
                    </div>
                    <div style="flex:1;padding:8px">
                        ${this.getBadge(this._marks)}
                        <div style="${textStyle.build()}">${this._title}</div>
                    </div>
                </div>
                <table style="${tableStyle.build()}">
                    <tbody>
                        ${this._content.map(this.getRow).join('')}
                    </tbody>
                </table>
            </div>
        `);
    }

    protected getBadge(marks: EXPRESS_SPECIAL_MARK[]): string {
        const badgeStyle = new StyleBuilder()
            .add('font-size', '18px')
            .add('color', 'red')
            .add('font-weight', 'bold');

        if (marks.length <= 0) {
            return '';
        } else {
            return (`
                <div style="${badgeStyle.build()}">${this._marks.join(', ')}</div>
            `);
        }
    }

    protected getRow(row: IDocTableElement): string {
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

        return (`
            <tr style="${rightStyle.build()}">
                <td style="${leftStyle.build()}">
                    ${row.name}
                </td>
                <td style="${rightStyle.build()}">
                    ${row.value}
                </td>
            </tr>
        `);
    }
}
