import React, {Component} from 'react'
import '../css/upgrade.css'
import JSONAutoclickers from '../json/autoclickers.json'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

class Upgrade extends Component{

  handleUpgrade(event) {
    console.log("DANS LA FONCTION DU DIABLE")
    if(this.props.zombies > JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]["price"]){ // Nombre de zombies suffisant pour acheter l'upgrade
      this.props.handleUpgrade(JSONAutoclickers[this.props.autoclicker], JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade], true)
      JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]["bought"] = true
    }
  }

  render() {

    var target = JSONAutoclickers[this.props.autoclicker]["upgrades"][this.props.upgrade]

    const tooltipUpdate = (
      <Tooltip id="tooltip">
          <h4>{target["title"]}</h4>
          {target["description"]}
      </Tooltip>
    )

    return(
      <OverlayTrigger placement="top" overlay={tooltipUpdate}>
      <div
        className="upgrade"
        onClick={this.handleUpgrade.bind(this)}
        hidden={+JSONAutoclickers[this.props.autoclicker]["number"] >= +target["unlockAt"] && target["bought"] === false ? false : true}
      >

        <i className="fa fa-arrow-up" aria-hidden="true"></i>

      </div>
      </OverlayTrigger>

    )
  }
}

export default Upgrade
