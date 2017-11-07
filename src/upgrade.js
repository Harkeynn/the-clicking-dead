import React, {Component} from 'react'
import './upgrade.css'
import JSONAutoclickers from './autoclickers.json'

class Upgrade extends Component{

  handleUpgrade = () => {
    this.props.handleUpgrade(JSONAutoclickers[this.props.autoclicker], JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade])
  }

  render() {
    var target = JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]
    return(
      <li className="collection-item" onClick={this.handleUpgrade}>
        {target["title"]} {target["price"]}
        <span className="right">{target["upgradeType"] + target["upgradeValue"]} upgrade</span>
      </li>
    )
  }
}

export default Upgrade