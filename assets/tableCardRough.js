const getCard = (icon, title, content, marks) => {
    const outerStyle = 'width:auto;margin-top:30px;margin-bottom:30px;padding:15px';
    const tableStyle = 'border:1px solid black;width:100%;border-collapse:collapse';
    const textStyle = 'font-size:26px;font-weight:bold';
    const leftStyle = 'border:1px solid black;width:25%;padding:3px;padding-right:5px;font-weight:bold;text-align:right';
    const rightStyle = 'padding:3px;padding-left:5px;border:1px solid black';
    const badgeStyle = 'font-size:18px;color:red;font-weight:bold';
    const getBadge = (marks) => `<div style="${badgeStyle}">${marks.join(', ')}</div>`;
    const getRow = (row) => `<tr style="${rightStyle}"><td style="${leftStyle}">${row.name}
        </td><td style="${rightStyle}">${row.value}</td></tr>`;
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
    document.getElementById('content').innerHTML = result;
};