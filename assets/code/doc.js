const cards = document.querySelectorAll('div[data-doc]');

const getSpace = (amount) => {
    let spaces = '';
    for (let i = 0; i < amount; i++) {
        spaces += ' ';
    }
    return spaces;
};

const convertObjectToHTMLFriendlyJson = (object, padding, layer) => {
    let result = JSON.stringify(object, null, padding + (layer ? layer * padding : 0));
    if (layer) {
        result = result
            .replace(/\n}/g, `\n${getSpace(layer * padding)}}`)
            .replace(/\n]/g, `\n${getSpace(layer * padding)}]`);
    }
    return result
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;')
        .replace(/"/g, '');
};


const send = () => {
    const inputs = document.querySelectorAll('input[data-test-drive-input]');
    const info = {};
    for (let input of inputs) {
        const key = input.attributes['data-test-drive-input'].value;
        info[key] = input.value;
    }
    const dataKey = document.querySelector('td[data-path]');
    const path = dataKey.innerText;
    fetch(path, {
        method: 'GET',
        headers: {
            authorization: 'Basic ' + info.key,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data) {
            const html = convertObjectToHTMLFriendlyJson(data, 3);
            console.log(html);
            document.getElementById('test-drive').innerHTML = html;
        }
    }).catch(function (err) {
        console.log(err);
    });
};

for (let card of cards) {
    card.addEventListener('click', () => {
        document.getElementById('content').innerHTML = 'Loading';
        fetch('/doc/' + card.attributes['data-doc'].value, {
            method: 'GET',
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            if (data) {
                document.getElementById('content').innerHTML = data;
                const sendButton = document.getElementById('markus-send');
                if (sendButton) {
                    sendButton.addEventListener('click', send)
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
}