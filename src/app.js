import React, { Component } from 'react'
import Increment from './increment'
import Autoclicker from './autoclicker'
import numeral from 'numeral'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 0,
      autoClickTotal: 0,
    }
  }

  //Sets the page title on initialisation
  componentDidMount() {
    document.title = numeral(this.state.zombies).format('0.00e+0') + " zombies - The Clicking Dead"
  }

  //Updates zombies and page title when clicking on the <Incremement /> button
  handleZombIncr = () => {
    this.setState(
      {
        zombies: this.state.zombies + 1
      },
      function() {
        document.title = numeral(this.state.zombies).format('0.00e+0') + " zombies - The Clicking Dead"
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
        zombies: Math.round((this.state.zombies + parseFloat(this.state.autoClickTotal))*100)/100
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
          zombies={this.state.zombies}
          zps={this.state.autoClickTotal}
        />
        <Autoclicker
          isActive={this.activator(10)}
          handleAutoClick={this.handleAutoClicker}
          autoclicker="autoclicker1"
          zps={this.state.zps}
        />
        <Autoclicker
          isActive={this.activator(100)}
          handleAutoClick={this.handleAutoClicker}
          autoclicker="autoclicker2"
          zps={this.state.zps}
        />
      </div>
    )
  }
}

export default App