import React, { Component } from 'react'
import Upgrade from './upgrade'
import JSONAutoclickers from '../json/autoclickers.json'
import { format } from './numbers'
import icon from '../img/illustrations/icon_test.jpg'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Autoclicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      isBuying: false,
    }
  }



  //set price to base price * 1.15^N (N=number of autoclicker(s))
  incrementPrice(price) {
    return Math.round(price * Math.pow(1.15, JSONAutoclickers[this.props.autoclicker]["number"]))
  }

  //Updates the number of this auto zombiefier and sends the value to add to the total of zombie/sec to app
  handleBuy(event) {
    if(!this.state.isBuying) {
      JSONAutoclickers[this.props.autoclicker]["number"]++
      JSONAutoclickers[this.props.autoclicker]["totalClickValue"] = +JSONAutoclickers[this.props.autoclicker]["totalClickValue"] + +JSONAutoclickers[this.props.autoclicker]["clickValue"]
      this.props.handleAutoClick(JSONAutoclickers[this.props.autoclicker]["incrementedPrice"])
      JSONAutoclickers[this.props.autoclicker]["incrementedPrice"] = this.incrementPrice(JSONAutoclickers[this.props.autoclicker]["price"])
    }
  }

  //Activates <Autoclicker />'s button when trigger is reached
  activator(trigger) {
    if (this.props.zombies > trigger) {
      return true
    } else {
      return false
    }
  }

  //Detects if the upgrade is an additon or multiplication
  //Updates the base click value and the total click value
  //Calls a function to update ZPS
  handleUpgrade = (autoclicker, upgrade, isBuying) => {
    this.setState({ isBuying: isBuying, })
    switch (upgrade["upgradeType"]) {
      case '+':
        autoclicker["clickValue"] = +autoclicker["clickValue"] + +upgrade["upgradeValue"]
        autoclicker["totalClickValue"] = +autoclicker["clickValue"] * autoclicker["number"]
        this.setState({ isBuying: !isBuying, })
        break
      case 'x':
        autoclicker["clickValue"] = +autoclicker["clickValue"] * +upgrade["upgradeValue"]
        autoclicker["totalClickValue"] = +autoclicker["clickValue"] * autoclicker["number"]
        this.setState({ isBuying: !isBuying, })
        break
      default:
        console.error("Error : upgrade not found")
    }
    this.props.handleUpgrade(upgrade["price"])
  }

  getFirstUnboughtUpgrade = () => {
    const upgradeN = Object.keys(JSONAutoclickers[this.props.autoclicker]["upgrades"]) // Nombre d'upgrades
    const upgradeValues = Object.values(JSONAutoclickers[this.props.autoclicker]["upgrades"])

    for (var i = 0; i < upgradeN.length; i++) {
      if (!upgradeValues[i].bought) {
        return upgradeN[i] // First unbought upgrade
      }
    }
    return false // No more upgrade
  }

  render() {

    let totalClickValue = Math.round(JSONAutoclickers[this.props.autoclicker]["totalClickValue"] * 10) / 10
    var target = JSONAutoclickers[this.props.autoclicker]
    const tooltipAmelio = (
      <Tooltip id="tooltip">
        <div className="infobulle" dangerouslySetInnerHTML={{__html: target["description"]}} />
        • Your <b>{target["number"]}</b> improvements generate <b>{totalClickValue}</b> zombies per seconds.
      </Tooltip>
    )

    return (

      <div>
        <OverlayTrigger placement="left" overlay={tooltipAmelio}>
        <div
          className={this.activator(this.incrementPrice(target["price"])) ? "improvementBox" : "improvementBox unvailable"}
          onClick={this.activator(this.incrementPrice(target["price"])) ? this.handleBuy.bind(this) : null}>

						<img className="img-fluid" src={target["image"]} />
						<div className="improvementInfo">
							<h4>{target["title"]}</h4>
							<p><span>{format(target["incrementedPrice"])}</span><i className="fa fa-users" aria-hidden="true"></i> Owned : {target["number"]}</p>
						</div>
              {this.getFirstUnboughtUpgrade() ? <Upgrade
                  autoclicker={this.props.autoclicker}
                  upgrade={this.getFirstUnboughtUpgrade()}
                  handleUpgrade={this.handleUpgrade}
                  zombies={this.props.zombies}
              /> : null }
					</div>
          </OverlayTrigger>
      </div>
    )
  }
}

export default Autoclicker
