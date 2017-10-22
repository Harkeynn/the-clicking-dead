import React, { Component } from 'react'
import numeral from 'numeral'

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
    return (
      <div className="container">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <div className="card-title">
                Zombies
                <span className="right">ZPS : {numeral(this.props.zps).format('0.000 a').toUpperCase()}</span>
              </div>
              <p>{numeral(this.props.zombies).format('0.000 a').toUpperCase()}</p>
            </div>
            <div className="card-action">
              <button className="btn" onClick={this.handleIncrement}>Moar zombies</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Increment