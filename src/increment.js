import React, { Component } from 'react'

class Increment extends Component {

  constructor() {
    super()
    this.state = {
      zombies: 0
    }
  }

  handleIncrement = () => {
    const newValue = this.state.zombies + 1
    this.setState({
      zombies: newValue
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Zombies</span>
              <p>{this.state.zombies}</p>
            </div>
            <div class="card-action">
              <button className="btn" onClick={this.handleIncrement}>Moar zombies</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Increment