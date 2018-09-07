/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Small Card
 */

import { EXPRESS_SPECIAL_MARK } from '../../../service/interface';
import { IDocTemplateRenderer } from '../../interface';
import StyleBuilder from '../style';

export default class DocSmallCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _name: string;
    private _path: string;
    private _title: string;
    private _marks: EXPRESS_SPECIAL_MARK[];

    public constructor(name: string, title: string, path: string, marks: EXPRESS_SPECIAL_MARK[]) {
        this._icon = '/a/' + name + '/?text=@E';
        this._name = name;
        this._title = title;
        this._path = path;
        this._marks = marks;
    }

    public build(): string {
        const outerStyle = new StyleBuilder()
            .add('margin-top', '15px')
            .add('margin-bottom', '15px')
            .add('overflow', 'hidden')
            .add('padding', '5px');
        const textStyle = new StyleBuilder()
            .add('font-size', '20px')
            .add('font-weight', 'bold');
        const subTextStyle = new StyleBuilder()
            .add('font-size', '18px')
            .add('color', 'darkgray')
            .add('font-weight', 'bold');

        return (`
            <div style="${outerStyle.build()}" class="card" onClick="
                getDoc(${JSON.stringify(this._name).replace(/\"/g, "'")})
            ">
                <div style="display:flex;align-items:flex-end">
                    <div style="width:80px" class="card-icon">
                        <img src="${this._icon}" width="80px" height="80px">
                    </div>
                    <div style="flex:1;padding:6px" class="card-content">
                        ${this.getBadge(this._marks)}
                        <div style="${textStyle.build()}">${this._title}</div>
                        <div style="${subTextStyle.build()}">${this._path}</div>
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
