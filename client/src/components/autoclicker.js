import React, { Component } from 'react'
import Upgrade from './upgrade'
import JSONAutoclickers from '../json/autoclickers.json'
import { format } from './numbers'
import icon from '../img/illustrations/icon_test.jpg'
import FontAwesome from 'react-fontawesome'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

class Autoclicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
    }
  }


  //set price to base price * 1.15^N (N=number of autoclicker(s))
  incrementPrice(price) {
    return Math.round(price * Math.pow(1.15, JSONAutoclickers[this.props.autoclicker]["number"]))
  }

  //Updates the number of this auto zombiefier and sends the value to add to the total of zombie/sec to app
  handleBuy = () => {
    JSONAutoclickers[this.props.autoclicker]["number"]++
    JSONAutoclickers[this.props.autoclicker]["totalClickValue"] = +JSONAutoclickers[this.props.autoclicker]["totalClickValue"] + +JSONAutoclickers[this.props.autoclicker]["clickValue"]
    this.props.handleAutoClick(JSONAutoclickers[this.props.autoclicker]["incrementedPrice"])
    JSONAutoclickers[this.props.autoclicker]["incrementedPrice"] = this.incrementPrice(JSONAutoclickers[this.props.autoclicker]["price"])
  }

  //Activates <Autoclicker />'s button when trigger is reached
  activator(trigger) {
    if (this.props.zombies >= trigger) {
      return true
    } else {
      return false
    }
  }

  //Detects if the upgrade is an additon or multiplication
  //Updates the base click value and the total click value
  //Calls a function to update ZPS
  handleUpgrade = (autoclicker, upgrade) => {
    switch (upgrade["upgradeType"]) {
      case '+':
        autoclicker["clickValue"] = +autoclicker["clickValue"] + +upgrade["upgradeValue"]
        autoclicker["totalClickValue"] = +autoclicker["clickValue"] * autoclicker["number"]
        break
      case 'x':
        autoclicker["clickValue"] = autoclicker["clickValue"] * upgrade["upgradeValue"]
        autoclicker["totalClickValue"] = autoclicker["clickValue"] * autoclicker["number"]
        break
      default:
        console.error("Error : upgrade not found")
    }
    this.props.handleUpgrade(upgrade["price"])
  }

  render() {
    var target = JSONAutoclickers[this.props.autoclicker]
    var percent = Math.round(((target["number"] * target["clickValue"]) * 100) / this.props.zps) || 0
    const tooltipAmelio = (
      <Tooltip id="tooltip">{target["description"]}</Tooltip>
    );
    const tooltipUpdate = (
      <Tooltip id="tooltip">UPDATE</Tooltip>
    );
    return (

      <div>
        <OverlayTrigger placement="left" overlay={tooltipAmelio}>
        <div className={this.activator(this.incrementPrice(target["price"])) ? "improvementBox" : "improvementBox unvailable"} onClick={this.handleBuy}>
        
						<img className="img-fluid" src={icon} />
						<div className="improvementInfo">
							<h4>{target["title"]}</h4>
							<p>{format(target["incrementedPrice"])}<i class="fa fa-users" aria-hidden="true"></i> Owned : 100</p> 
						</div>
            <OverlayTrigger placement="top" overlay={tooltipUpdate}>
						<div className="upgrade">
              {Object.keys(target["upgrades"]).map((upgrade) => {
                  return (
                    <Upgrade
                      autoclicker={this.props.autoclicker}
                      upgrade={upgrade}
                      handleUpgrade={this.handleUpgrade}
                      zombies={this.props.zombies}
                      key={upgrade}
                    />
                  )
                })}
							<i className="fa fa-arrow-up" aria-hidden="true"></i>
              
						</div>
            </OverlayTrigger>
					</div>
          </OverlayTrigger>
      </div>

      /*
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="card-title activator">
              {target["title"]}
              <span className="right">{format(target["incrementedPrice"])}</span>
            </div>
            <span className="right">x{target["number"]}({percent}%)</span>
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
                    zombies={this.props.zombies}
                    key={upgrade}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>*/
    )
  }
}

export default Autoclicker