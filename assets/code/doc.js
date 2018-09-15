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
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
}