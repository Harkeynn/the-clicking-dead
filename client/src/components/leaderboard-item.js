import React, { Component } from 'react'
import {Card} from 'react-materialize'

class LeaderboardItem extends Component {
  render() {
    const { nickname, score } = this.props
    return (
      <div className="App">
        <Card className='blue-grey darken-1' textClassName='white-text' title={nickname}>
          {score}
        </Card>
      </div>
    )
  }
}

export default LeaderboardItem