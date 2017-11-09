import React, { Component } from 'react'
import Increment from './increment'
import Autoclicker from './autoclicker'
import Login from './login'
import Profile from './profile'
import JSONAutoclickers from './autoclickers.json'
import { format } from './numbers'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 90,
      autoClickTotal: 0,
    }

  }

  //Sets the page title on initialisation
  componentDidMount() {
    document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
  }

  //Updates zombies and page title when clicking on the <Incremement /> button
  handleZombIncr = () => {
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

  //Adds the total of zombies/sec to zombies every seconds and update the page title
  autoClick() {
    return setInterval(() => {
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

export default App