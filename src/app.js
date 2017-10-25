import React, { Component } from 'react'
import Increment from './increment'
import Autoclicker from './autoclicker'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 0,
      autoClickTotal: 0,
    }
  }

  //Method used to format big numbers
  format(number) {
    switch (true) {
      case (number >= Math.pow(10, 33)):
        return Math.floor(number / Math.pow(10, 30)) / 1000 + ' Dec'
      case (number >= Math.pow(10, 30)):
        return Math.floor(number / Math.pow(10, 27)) / 1000 + ' Non'
      case (number >= Math.pow(10, 27)):
        return Math.floor(number / Math.pow(10, 24)) / 1000 + ' Oct'
      case (number >= Math.pow(10, 24)):
        return Math.floor(number / Math.pow(10, 21)) / 1000 + ' Sept'
      case (number >= Math.pow(10, 21)):
        return Math.floor(number / Math.pow(10, 18)) / 1000 + ' Sext'
      case (number >= Math.pow(10, 18)):
        return Math.floor(number / Math.pow(10, 15)) / 1000 + ' Quin'
      case (number >= Math.pow(10, 15)):
        return Math.floor(number / Math.pow(10, 12)) / 1000 + ' Quad'
      case (number >= Math.pow(10, 12)):
        return Math.floor(number / Math.pow(10, 9)) / 1000 + ' T'
      case (number >= Math.pow(10, 9)):
        return Math.floor(number / Math.pow(10, 6)) / 1000 + ' B'
      case (number >= Math.pow(10, 6)):
        return Math.floor(number / Math.pow(10, 3)) / 1000 + ' M'
      case (number >= Math.pow(10, 3)):
        return Math.floor(number) / 1000 + ' K'
      default:
        return number
    }
  }

  //Sets the page title on initialisation
  componentDidMount() {
    document.title = this.format(this.state.zombies) + " zombies - The Clicking Dead"
  }

  //Updates zombies and page title when clicking on the <Incremement /> button
  handleZombIncr = () => {
    this.setState(
      {
        zombies: this.state.zombies + 1
      },
      function () {
        document.title = this.format(this.state.zombies) + " zombies - The Clicking Dead"
      }
    )
  }

  //Activates <Autoclicker />'s button when trigger is reached
  activator = (trigger) => {
    if (this.state.zombies >= trigger) {
      return true
    } else {
      return false
    }
  }

  //Adds the value of the auto zombiefier bought to the total of zombie/sec
  handleAutoClicker = (clickValue, price) => {
    this.setState({
      zombies: this.state.zombies - price,
      autoClickTotal: this.state.autoClickTotal + parseFloat(clickValue)
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
        zombies: Math.round((this.state.zombies + parseFloat(this.state.autoClickTotal)) * 100) / 100
      })
      document.title = this.state.zombies + " zombies - The Clicking Dead"
    }, 1000)
  }

  render() {
    return (
      <div className="container">
        <h1>The Clicking Dead</h1>
        <Increment
          handleZombieIncrement={this.handleZombIncr}
          zombies={this.format(this.state.zombies)}
          zps={this.format(this.state.autoClickTotal)}
        />
        <Autoclicker
          isActive={this.activator(10)}
          handleAutoClick={this.handleAutoClicker}
          autoclicker="autoclicker1"
          zps={this.format(this.state.zps)}
        />
        <Autoclicker
          isActive={this.activator(100)}
          handleAutoClick={this.handleAutoClicker}
          autoclicker="autoclicker2"
          zps={this.format(this.state.zps)}
        />
      </div>
    )
  }
}

export default App