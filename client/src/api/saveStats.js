function save(nbzombies, nbhumains, score) {
    console.log(nbhumains)
    console.log(score)
    return fetch('http://localhost:1973/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'CORS',
        body: JSON.stringify(
            {
                nbzombies: nbzombies,
                nbhumains: nbhumains,
                score: score

            }
        ),
    }).then(res => {
        return res
    }).catch(err => err)
}
module.exports = { save }