/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Table Card
 */

import { EXPRESS_SPECIAL_MARK, IExpressRoute, IText } from '../../../service/interface';
import LanguageTextProcessor from '../../../service/language';
import { IDocTableElement, IDocTemplateRenderer } from '../../interface';
import { nodeMarkusFormData } from '../../util/code';
import { convertRouteToTemplate } from '../../util/covert';
import StyleBuilder from '../style';

export default class DocTableCardTemplateRenderer implements IDocTemplateRenderer {
    private _icon: string;
    private _title: string;
    private _content: IDocTableElement[];
    private _marks: EXPRESS_SPECIAL_MARK[];

    public constructor(route: IExpressRoute, language: keyof IText, url: string) {
        const processor: LanguageTextProcessor = new LanguageTextProcessor(language);
        this._icon = '/a/' + route.name + '/?text=@E';
        this._title = route.doc ? processor.from(route.doc.name) : route.name;
        this._content = convertRouteToTemplate(route, processor);
        this._marks = route.specialMark || [],

        this.getNodeCode = this.getNodeCode.bind(this);
    }

    public build(): string {
        const outerStyle = new StyleBuilder()
            .add('width', 'auto')
            .add('margin-top', '30px')
            .add('margin-bottom', '30px')
            .add('padding', '15px');
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
                        ${this.getNodeCode()}
                    </tbody>
                </table>
            </div>
        `);
    }

    protected getNodeCode(): string {
        return this.getRow({
            name: 'NodeJS',
            value: `<pre class="prettyprint"><code class="lang-js">${nodeMarkusFormData()}</code></pre>`,
        });
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
            .add('width', '20%')
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
