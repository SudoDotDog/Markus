/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Card
 */

import StyleBuilder from '../style';

export const docTemplateComponentCard = (icon: string, title: string, content: string[]) => {
    const outerStyle = new StyleBuilder()
        .add('width', '100%')
        .add('border', '1px solid black');

    return (`
        <div style="${outerStyle.build()}">
            <div>
                <img src="${icon}" width="100px" height="100px">
                ${title}
            </div>
            <hr>
            ${content.join('<br>')}
        </div>
    `)
};
