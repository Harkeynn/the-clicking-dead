import React, { Component } from 'react'
import imgEurope from '../img/illustrations/0.png'
import imgAsia from '../img/illustrations/1.png'
import imgAfrica from '../img/illustrations/2.png'
import imgOceania from '../img/illustrations/3.png'
import imgNAmerica from '../img/illustrations/4.png'
import imgSAmerica from '../img/illustrations/5.png'

class Increment extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  //Updates number of zombies on button click
  handleIncrement = () => {
    this.setState({
      zombies: this.props.zombies + 1
    })
    this.props.handleZombieIncrement()
  }

  render() {
    let img
    switch (this.props.whatContinent) {
      case "Europe":
        img = imgEurope
        break
      case "Asia":
        img = imgAsia
        break
      case "Africa":
        img = imgAfrica
        break
      case "Oceania":
        img = imgOceania
        break
      case "North America":
        img = imgNAmerica
        break
      case "South America":
        img = imgSAmerica
        break
      default:
        console.log("ERROR")
    }
    return (
      <div className="zombieImg" style={{backgroundImage : "url(" + img + ")"}} onClick={this.handleIncrement}>

      </div>
    )
  }
}

export default Increment
