function addLeaderboard(data) {
    return fetch('http://localhost:1973/leaderboard', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res
    }).catch(err => err)
}
module.exports = { addLeaderboard }