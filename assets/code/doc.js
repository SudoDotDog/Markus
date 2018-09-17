const cards = document.querySelectorAll('div[data-doc]');

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
                if(sendButton){
                    sendButton.addEventListener('click', () => {
                        const inputs = document.querySelectorAll('input[data-test-drive-input]');
                        const info = {};
                        for(let input of inputs){
                            const key = input.attributes['data-test-drive-input'].value;
                            info[key] = input.value;
                        }
                        console.log(info);
                    })
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
}
