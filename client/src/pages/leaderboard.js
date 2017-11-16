import React, { Component } from 'react'
import LeaderboardItem from '../components/leaderboard-item'
import { Link } from 'react-router-dom'

class Leaderboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:1973/leaderboard')
    .then((res) => {
      return res.json()
    })
    .then(jsonData => {
      this.setState({
        data: jsonData
      })
    })
  }

  render() {
    return (
        <div className="Leaderboard">
        <h2>VOICI LE BEST LEADERBOARD, CHECK IT OUT MATE</h2>
        <Link to="/game">Retour au jeu !</Link>
          {this.state.data.map(row => <LeaderboardItem nickname={row.nickname} score={row.score} key={row.id} />)}
        </div>
    )
  }
}

export default Leaderboard