import React, { Component } from 'react'
import JSONAutoclickers from '../json/autoclickers.json'
import { Link } from 'react-router-dom'
//COMPONENTS
import { format } from '../components/numbers'
import Increment from '../components/increment'
import Autoclicker from '../components/autoclicker'
import Login from '../components/login'
import Profile from '../components/profile'
import Sauvegarde from '../components/sauvegarde'
import Achievement from '../components/achievement'
import Map from '../components/map'
import Leaderboard from '../components/leaderboard'
//STYLES
import '../css/style.css'
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
//IMAGES
import logo from '../img/design/logo.png'


let nameContinent
const riposte = [
  ["Les humains attaquent", 100],
  ["Vaccin", 200]
]
let randomAttack;

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 0,
      humans: 7000000000,
      autoClickTotal: 0,
      score: 0,
      areFighting: false,
    }
  }

  //Sets the page title on initialisation
  componentDidMount() {
    document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
    this.getScore()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  //Updates zombies and page title when clicking on the <Incremement /> button
  handleZombIncr = () => {
    this.getScore()
    this.setState(
      {
        zombies: this.state.zombies + 1,
        humans: this.state.humans - 1
      },
      function () {
        document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
      }
    )
  }

  //Adds the value of the autoclicker bought to the total of ZPS
  //Or update the total of ZPS if an upgrade has been bought
  handleAutoClick = (price) => {
    let totalZPS = 0
    Object.keys(JSONAutoclickers).map((autoclicker) => {
      return totalZPS = totalZPS + +JSONAutoclickers[autoclicker]["totalClickValue"]
    })
    this.setState({
      zombies: this.state.zombies - price,
      autoClickTotal: totalZPS
    })
    if (this.state.autoClickTotal === 0) {
      //Set timer for the first time
      this.timer = this.autoClick()
    } else {
      //Reset timer on each click
      clearInterval(this.timer)
      this.timer = this.autoClick()
    }
  }

  getScore = () => {
    var score = this.state.zombies*0.001
    Object.keys(JSONAutoclickers).map((autoclicker) => {
      score += (+JSONAutoclickers[autoclicker]["number"]*(+JSONAutoclickers[autoclicker]["value"]*10))
      Object.keys(JSONAutoclickers[autoclicker]["upgrades"]).map((upgrade) => {
        if(upgrade["bought"]){
          score += upgrade["value"]*upgrade["upgradeValue"]*+JSONAutoclickers[autoclicker]["number"] + upgrade["value"]*(Math.pow(+JSONAutoclickers[autoclicker]["value"],2)*10)
        }
      })
    })
    this.setState({
      score: score
    })
  }

  //Adds the total of zombies/sec to zombies every 0.5 seconds and update the page title
  autoClick() {
    return setInterval(() => {
      this.getScore()
      this.setState({
        zombies: Math.round((this.state.zombies + parseFloat(this.state.autoClickTotal) / 2) * 100) / 100,
        humans: Math.round((this.state.humans - parseFloat(this.state.autoClickTotal) / 2) * 100) / 100
      })
      document.title = format(Math.floor(this.state.zombies)) + " zombies - The Clicking Dead"
    }, 500)
  }

  continentName = (nContinent) => {
    nameContinent = nContinent
		console.log(nContinent)
	}

  humanFighting() { // Riposte des humains

    this.setState({ areFighting: true, })

    let interval = 1000;
    let destroyZombies = 1;

    return setInterval(() => {

      if(this.state.zombies < 50) {
        destroyZombies = 1;
      }

      if(this.state.zombies > 50) {
        destroyZombies = 3;
      }

      if(1 === Math.floor(Math.random()*30)) {
        randomAttack = Math.floor(Math.random()*2);
        destroyZombies = riposte[randomAttack][1];
        console.log("ATTAQUE : " + randomAttack)
      }

      this.setState({
        zombies: Math.floor(this.state.zombies) - destroyZombies
      })
    }, interval)

  }



  render() {

    let zombiesInt = Math.floor(this.state.zombies)
    let humans = format(Math.floor(this.state.humans))
    let humansAll = Math.floor(this.state.humans)
    const tooltipAllHumans = (
      <Tooltip id="tooltip">{humansAll}</Tooltip>
    );

    console.log("zombies : " + this.state.zombies)
    console.log("autoclick : " + this.state.autoClickTotal)

    if(!this.state.areFighting && zombiesInt === 10){ this.humanFighting() } // Humans are fighting back

    return (
      <div>

        <nav className="navbar fixed-top navbar-expand-sm" id="mainNav">
        <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#fullNav" aria-controls="fullNav" aria-expanded="false" aria-label="Toggle navigation">
				 Menu <i class="fa fa-bars" aria-hidden="true"></i>
			  </button>
        <div class="collapse navbar-collapse" id="fullNav">
          <Nav className="navbar-nav ml-auto">

            <NavItem>
              <i class="fa fa-user" aria-hidden="true"></i><Profile/>
            </NavItem>
            <NavItem>
              <i class="fa fa-trophy" aria-hidden="true"></i><Leaderboard />
            </NavItem>
            <NavItem>
              <i class="fa fa-sign-out" aria-hidden="true"></i><Login/>
            </NavItem>
          </Nav>
        </div>
        </nav>

        <div className="container-fluid" id="content">
          <Row className="no-gutters">
            <Col md="3" id="zombieZone">
              <Increment
                handleZombieIncrement={this.handleZombIncr}
                zombies={format(Math.floor(this.state.zombies))}
                zps={format(this.state.autoClickTotal)}
                whatContinent = {nameContinent}
              />
            </Col>
            <Col md="6" id="mapZone">
              <img className="img-fluid" src={logo} alt="Logo" title="Logo" />

              <Map
                zombies = {zombiesInt}
                continentName = {this.continentName}
                attackHuman = {randomAttack ? riposte[randomAttack][0] : null}
              />

              <Row id="stats">
                <Col md="6" className="text-right">
                  <div className="statsContent">
                    <h3>Zombies</h3>
                    <p>{zombiesInt}</p>
                  </div>
                </Col>
                <Col md="6" className="text-left">
                  <div className="statsContent">
                    <h3>Humans</h3>
                    <OverlayTrigger placement="bottom" overlay={tooltipAllHumans}>
                      <p>{humans}</p>
                    </OverlayTrigger>
                  </div>
                </Col>
				      </Row>
            </Col>
            <Col md="3" id="improvementsZone">
              <Scrollbars id="improvementsScroll">
                {Object.keys(JSONAutoclickers).map((autoclicker) => {
                  return (
                    <Autoclicker
                    zombies={this.state.zombies}
                    handleAutoClick={this.handleAutoClick}
                    autoclicker={autoclicker}
                    zps={this.state.autoClickTotal}
                    handleUpgrade={this.handleAutoClick}
                    key={autoclicker}
                  />
                  )
                })}
              </Scrollbars>
            </Col>
          </Row>
          <Row className="no-gutters" id="achievementsZone">
            <Achievement />
          </Row>
        </div>
      </div>

        /*<div className="container">
          <h1>The Clicking Dead</h1>
          <Login/>
          <Profile/>
          <Sauvegarde score={this.state.score}/>
          <Link to="/leaderboard">Leaderboard</Link>
          <Increment
            handleZombieIncrement={this.handleZombIncr}
            zombies={format(Math.floor(this.state.zombies))}
            zps={format(this.state.autoClickTotal)}
          />
          {Object.keys(JSONAutoclickers).map((autoclicker) => {
            return (
              <Autoclicker
              zombies={this.state.zombies}
              handleAutoClick={this.handleAutoClick}
              autoclicker={autoclicker}
              zps={this.state.autoClickTotal}
              handleUpgrade={this.handleAutoClick}
              key={autoclicker}
            />
            )
          })}
        </div>*/

    )
  }
}

export default Game
