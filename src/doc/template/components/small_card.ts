/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Small Card
 */

import { EXPRESS_SPECIAL_MARK } from '../../../service/interface';
import { IDocTableElement, IDocTemplateRenderer } from '../../interface';
import StyleBuilder from '../style';

export default class DocSmallCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _name: string;
    private _title: string;
    private _content: IDocTableElement[];
    private _marks: EXPRESS_SPECIAL_MARK[];

    public constructor(name: string, title: string, content: IDocTableElement[], marks: EXPRESS_SPECIAL_MARK[]) {
        this._icon = '/a/' + name + '/?text=@E';
        this._name = name;
        this._title = title;
        this._content = content;
        this._marks = marks;
    }

    public build(): string {
        const outerStyle = new StyleBuilder()
            .add('margin-top', '15px')
            .add('margin-bottom', '15px')
            .add('padding', '5px');
        const textStyle = new StyleBuilder()
            .add('font-size', '20px')
            .add('font-weight', 'bold');

        return (`
            <div style="${outerStyle.build()}" class="card" onClick="
                getDoc(${JSON.stringify(this._name).replace(/\"/g, "'")})
            ">
                <div style="display:flex;align-items:flex-end">
                    <div style="width:80px">
                        <img src="${this._icon}" width="80px" height="80px">
                    </div>
                    <div style="flex:1;padding:6px">
                        ${this.getBadge(this._marks)}
                        <div style="${textStyle.build()}">${this._title}</div>
                    </div>
                </div>
            </div>
        `);
    }

    protected getBadge(marks: EXPRESS_SPECIAL_MARK[]): string {
        const badgeStyle = new StyleBuilder()
            .add('font-size', '15px')
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
}
