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


  //Updates app.zombies when clicking on the <Incrmement /> button
  handleZombIncr = (numOfZombies) => {
    this.setState({
      zombies: this.state.zombies + 1
    })
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
  handleAutoClicker = (clickValue) => {
    this.setState({
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

  //Updates app.zombies and increment.zombies with the total of zombies/sec every seconds
  autoClick() {
    return setInterval(() => {
      this.setState({
        zombies: Math.round((this.incr.state.zombies + parseFloat(this.state.autoClickTotal))*100)/100
      })
      this.incr.setState({
        zombies: Math.round((this.incr.state.zombies + parseFloat(this.state.autoClickTotal))*100)/100
      })
      console.log(this.incr.state.zombies + " ; " + this.state.zombies)
    }, 1000)
  }

  render() {
    return (
      <div className="container">
        <h1>The Clicking Dead</h1>
        <Increment 
          handleZombieIncrement={this.handleZombIncr}
          ref={(increment) => this.incr = increment}
        />
        <Autoclicker
          isActive={this.activator(1)}
          title="Title"
          description="Description"
          clickValue="0.5"
          handleAutoClick={this.handleAutoClicker}
        />
        <Autoclicker
          isActive={this.activator(10)}
          title="Title"
          description="Description"
          clickValue="2.3"
          handleAutoClick={this.handleAutoClicker}
        />
      </div>
    )
  }
}

export default App