function getUser() {

    return fetch('http://localhost:1973/userid')
    .then((res) => { return res.json()
    })
}

function getUserAccount(userId){
   return fetch('http://localhost:1973/accounts/'+userId+'')
    .then((res) => {
      if (!res.ok) { throw Error(res.statusText);}
      return res.json()
    })
}

function getAchievements(){
    return fetch('http://localhost:1973/achievement')
    .then((res) => {
      return res.json()
    })
}
module.exports = { getUser, getUserAccount, getAchievements }