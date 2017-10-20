import React, {Component} from 'react'

class Autoclicker extends Component{

  constructor() {
    super()
    this.state = {
      number: 0,
    }
  }

  //Updates the number of this auto zombiefier and sends the value to add to the total of zombie/sec to app
  handleBuy = () => {
    this.setState({
      number: this.state.number + 1
    })
    this.props.handleAutoClick(this.props.clickValue)
  }

  render() {
    return(
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.title}</span>
            <span className="right">x{this.state.number}</span>
            <p>{this.props.description}</p>
          </div>
          <div className="card-action">
            <button className={this.props.isActive ? "btn" : "btn disabled"} onClick={this.handleBuy}>Buy</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Autoclicker