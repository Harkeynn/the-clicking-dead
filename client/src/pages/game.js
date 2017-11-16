import React, { Component } from 'react'
import Increment from '../components/increment'
import Autoclicker from '../components/autoclicker'
import Login from '../components/login'
import Profile from '../components/profile'
import Sauvegarde from '../components/sauvegarde'
import JSONAutoclickers from '../json/autoclickers.json'
import { format } from '../components/numbers'
import { Link } from 'react-router-dom'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 90,
      autoClickTotal: 0,
      score: 0
    }
  }

  //Sets the page title on initialisation
  componentDidMount() {
    document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
    this.getScore()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  //Updates zombies and page title when clicking on the <Incremement /> button
  handleZombIncr = () => {
    this.getScore()
    this.setState(
      {
        zombies: this.state.zombies + 1
      },
      function () {
        document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
      }
    )
  }

  //Adds the value of the autoclicker bought to the total of ZPS
  //Or update the total of ZPS if an upgrade has been bought
  handleAutoClick = (price) => {
    let totalZPS = 0
    Object.keys(JSONAutoclickers).map((autoclicker) => {
      return totalZPS = totalZPS + +JSONAutoclickers[autoclicker]["totalClickValue"]
    })
    this.setState({
      zombies: this.state.zombies - price,
      autoClickTotal: totalZPS
    })
    if (this.state.autoClickTotal === 0) {
      //Set timer for the first time
      this.timer = this.autoClick()
    } else {
      //Reset timer on each click
      clearInterval(this.timer)
      this.timer = this.autoClick()
    }
  }

  getScore = () =>{
    var score = this.state.zombies*0.001
    Object.keys(JSONAutoclickers).map((autoclicker) => {
      score += (+JSONAutoclickers[autoclicker]["number"]*(+JSONAutoclickers[autoclicker]["value"]*10))
      Object.keys(JSONAutoclickers[autoclicker]["upgrades"]).map((upgrade) => {
        if(upgrade["bought"]){
          score += upgrade["value"]*upgrade["upgradeValue"]*+JSONAutoclickers[autoclicker]["number"] + upgrade["value"]*(Math.pow(+JSONAutoclickers[autoclicker]["value"],2)*10)
        }
      })
    })
    this.setState({
      score: score
    })
  }

  //Adds the total of zombies/sec to zombies every 0.5 seconds and update the page title
  autoClick() {
    return setInterval(() => {
      this.getScore()
      this.setState({
        zombies: Math.round((this.state.zombies + parseFloat(this.state.autoClickTotal) / 2) * 100) / 100
      })
      document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
    }, 500)
  }

  render() {

    return (
      <div className="container">
        <h1>The Clicking Dead</h1>
        <Login/>
        <Profile/>
        <Sauvegarde score={this.state.score}/>
        <Link to="/leaderboard">Leaderboard</Link>
        <Increment
          handleZombieIncrement={this.handleZombIncr}
          zombies={format(Math.floor(this.state.zombies))}
          zps={format(this.state.autoClickTotal)}
        />
        {Object.keys(JSONAutoclickers).map((autoclicker) => {
          return (
            <Autoclicker
            zombies={this.state.zombies}
            handleAutoClick={this.handleAutoClick}
            autoclicker={autoclicker}
            zps={this.state.autoClickTotal}
            handleUpgrade={this.handleAutoClick}
            key={autoclicker}
          />
          )
        })}
      </div>
    )
  }
}

export default Game