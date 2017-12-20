function updatePaswword(password) {
    return fetch('http://localhost:1973/updatepassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'CORS',
        body: JSON.stringify(
            {
                pass: password,
            }
        ),
    }).then(res => {
        return res
    }).catch(err => err)
}
module.exports = { updatePaswword }