import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Game from './pages/game'
import Leaderboard from './pages/leaderboard'

class App extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game" component={Game}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
      </Router>
    )
  }
}
const Home = () => (
  <div>
      <Redirect to="/game"/>
  </div>
)
const NoMatch = ({ location }) => (
  <div>
    <h3>ERROR 404</h3>
    <p>No match for <code>{location.pathname}</code></p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))