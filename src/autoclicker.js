import React, { Component } from 'react'
import Upgrade from './upgrade'
import JSONAutoclickers from './autoclickers.json'
import {format} from './numbers'

class Autoclicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      number: 0,
      percent: 0,
    }
  }

  incrementPrice(price){
    return Math.round(price*Math.pow(1.15,this.state.number))
  }

  //Updates the number of this auto zombiefier and sends the value to add to the total of zombie/sec to app
  handleBuy = () => {
    this.setState({
      number: this.state.number + 1
    })
    this.props.handleAutoClick(
      JSONAutoclickers[this.props.autoclicker]["clickValue"],
      this.incrementPrice(JSONAutoclickers[this.props.autoclicker]["price"])
    )
  }
  
  //Activates <Autoclicker />'s button when trigger is reached
  activator(trigger) {
    if (this.props.zombies >= trigger) {
      return true
    } else {
      return false
    }
  }

  handleUpgrade = (value, type) => {
    this.props.handleUpgrade(value, type)
    switch(type){
      case '+':
        JSONAutoclickers[this.props.autoclicker]["clickValue"] = +JSONAutoclickers[this.props.autoclicker]["clickValue"] + +value
        break
      case 'x':
        JSONAutoclickers[this.props.autoclicker]["clickValue"] = JSONAutoclickers[this.props.autoclicker]["clickValue"] * value
        break
      default:
        console.error("Error : upgrade not found")
    }
  }

  render() {
    var target = JSONAutoclickers[this.props.autoclicker]
    var percent = Math.round(((this.state.number*target["clickValue"])*100) / this.props.zps) || 0
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="card-title activator">
              {target["title"]}
              <span className="right">{format(this.incrementPrice(target["price"]))}</span>
            </div>
            <span className="right">x{this.state.number}({percent}%)</span>
            <p>{target["description"]}</p>
          </div>
          <div className="card-action">
            <button className={this.activator(this.incrementPrice(target["price"])) ? "btn" : "btn disabled"} onClick={this.handleBuy}>Buy</button>
          </div>
          <div className="card-reveal">
            <span className="card-title">{target["title"]}</span>
            <ul className="collection">
              {Object.keys(target["upgrades"]).map((upgrade) => {
                return (
                  <Upgrade
                    autoclicker={this.props.autoclicker}
                    upgrade={upgrade}
                    handleUpgrade={this.handleUpgrade}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Autoclicker