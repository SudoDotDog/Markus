const getDoc = () => {
    fetch('/doc/test', {
        method: 'POST',
        mode: 'cors',
        body: data,
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data) {
            console.log(data);
        }
    }).catch(function (err) {
        console.log(err);
    });
};