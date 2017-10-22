import React, {Component} from 'react'
import './upgrade.css'
import JSONAutoclickers from './autoclickers.json'

class Upgrade extends Component{
  render() {
    var target = JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]
    return(
      <li className="collection-item">
        {target["title"]}
        <span className="right">{target["upgradeType"] + target["upgradeValue"]} upgrade</span>
      </li>
    )
  }
}

export default Upgrade