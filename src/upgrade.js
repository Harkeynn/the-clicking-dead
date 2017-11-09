import React, {Component} from 'react'
import './upgrade.css'
import JSONAutoclickers from './autoclickers.json'

class Upgrade extends Component{

  handleUpgrade = () => {
    if(this.props.zombies >= JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]["price"]){
      this.props.handleUpgrade(JSONAutoclickers[this.props.autoclicker], JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade])
      JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade] = true
    }
  }

  render() {
    var target = JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]
    return(
      <li 
        className="collection-item"
        onClick={this.handleUpgrade}
        hidden={+JSONAutoclickers[this.props.autoclicker]["number"] >= +target["unlockAt"] || target["bought"] === false ? false : true}
      >
        {target["title"]} {target["price"]}
        <span className="right">{target["upgradeType"] + target["upgradeValue"]} upgrade</span>
      </li>
    )
  }
}

export default Upgrade