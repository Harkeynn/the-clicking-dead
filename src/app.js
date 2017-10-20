import React, {Component} from 'react'
import Increment from './increment'

class App extends Component {
  render() {
    return(
      <div className="container">
        <h1>The Clicking Dead</h1>
        <Increment />
      </div>
    )
  }
}

export default App