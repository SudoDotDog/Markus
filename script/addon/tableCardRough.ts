/**
 * @author WMXPY
 * @description Addon
 * @fileoverview table card rough
 */

enum DOC_TABLE_ELEMENT_IMPORTANT_LEVEL {
    NORMAL = 0,
    MAJOR = 1,
    CRITICAL = 2,
}

interface IDocTableElement {
    name: string;
    value: string;
    important?: DOC_TABLE_ELEMENT_IMPORTANT_LEVEL;
}

enum EXPRESS_SPECIAL_MARK {
    DEPRECATED = 'DEPRECATED',
    REMOVED = 'REMOVED',
    RISKY = 'RISKY',
    WARNING = 'WARNING',
    DEBUG = 'DEBUG',
}

const outerStyle: string = 'width:auto;margin-top:30px;margin-bottom:30px;padding:15px';
const tableStyle: string = 'border:1px solid black;width:100%;border-collapse:collapse';
const textStyle: string = 'font-size:26px;font-weight:bold';
const leftStyle: string = 'border:1px solid black;width:25%;padding:3px;padding-right:5px;font-weight:bold;text-align:right';
const rightStyle: string = 'padding:3px;padding-left:5px;border:1px solid black';
const badgeStyle: string = 'font-size:18px;color:red;font-weight:bold';

const getBadge = (marks: EXPRESS_SPECIAL_MARK[]): string => `<div style="${badgeStyle}">${marks.join(', ')}</div>`;

const getRow = (row: IDocTableElement): string => `<tr style="${rightStyle}"><td style="${leftStyle}">${row.name}
        </td><td style="${rightStyle}">${row.value}</td></tr>`;

const getCard = (icon: string, title: string, content: IDocTableElement[], marks: EXPRESS_SPECIAL_MARK[]) => {
    const result = (`
        <div style="${outerStyle}">
            <div style="display:flex;align-items:flex-end">
                <div style="width:100px">
                    <img src="${icon}" width="100px" height="100px">
                </div>
                <div style="flex:1;padding:8px">
                    ${getBadge(marks)}
                    <div style="${textStyle}">${title}</div>
                </div>
            </div>
            <table style="${tableStyle}">
                <tbody>
                    ${content.map(getRow).join('')}
                </tbody>
            </table>
        </div>
    `);
    const contentElement: HTMLElement | null = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML = result;
    } else {
        alert('ERROR');
    }
};
