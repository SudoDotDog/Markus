const getDoc = (name) => {
    fetch('/doc/' + name, {
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
};