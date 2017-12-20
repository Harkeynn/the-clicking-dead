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
import {nbZombiesContinent} from '../components/map'
import Leaderboard from '../components/leaderboard'
import SaveStats from '../api/saveStats'
//STYLES
import '../css/style.css'
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Modal from 'react-modal'
//IMAGES
import logo from '../img/design/logo.png'
import win from '../img/design/win.png'
import lose from '../img/design/lose.png'
import bg from '../img/design/background.jpg'
import { setInterval } from 'timers';
import GameCtrl from '../api/gameController'


const {saveInterval} = require( '../save.conf.json')

let destroyZombies = 0
let nameContinent
const riposte = [
  ["NEUTRE", 0],
  ["Humans put infected in quarantine", 5],
  ["Humans attack", 20],
  ["Humans found a cure", 50],
  ["Humans drop a nuclear bomb", 200],
]
let randomAttack
let imgEnd

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: '#222325 url('+bg+') no-repeat fixed center/cover',
    animationDuration: '3s',
		animationFillMode: 'both',
		animationName: 'fadeIn'
	},
	content: {
		top: '40%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: '500px',
		transform: 'translate(-50%, -50%)',
		padding: '0px',
		border: 'none',
    backgroundColor: 'transparent'
	},
}

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zombies: 0,
      humans: 7000,
      autoClickTotal: 0,
      score: 0,
      areFighting: false,
      userId: 0,
      username : "",
      achievements : "",
      winLose: false,
    }
  }

  // Sets the page title on initialisation
  componentDidMount() {

    // FETCH USER ID IN JSON
    GameCtrl.getUser()
    .then(jsonData => {
      let userid = jsonData.userid[0];
      this.setState({ userId: userid, })

      if (this.state.userId) {
        GameCtrl.getUserAccount(this.state.userId)
        .then(jsonData => {
          this.setState ({
            username : jsonData.nickname,
            /*zombies: jsonData.nbzombies,
            humans: jsonData.nbhumains,*/
            score: jsonData.score
          })
        })
      }
    })

    // FETCH ACHIEVEMENT
    GameCtrl.getAchievements()
    .then(jsonData => {
      this.setState ({
        achievements : jsonData,
      })
    })

    setInterval(() => this.saveUserStats(), saveInterval)
    this.getScore()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    clearInterval(this.humansTimer)
  }

  saveUserStats(){
    SaveStats.save(
      this.state.zombies,
      this.state.humans,
      this.state.score
    );
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
    var score = this.state.zombies*0.1
    Object.keys(JSONAutoclickers).map((autoclicker) => {
      score += (+JSONAutoclickers[autoclicker]["number"]*(+JSONAutoclickers[autoclicker]["value"]*10))
      Object.keys(JSONAutoclickers[autoclicker]["upgrades"]).map((upgrade) => {
        if(upgrade["bought"]){
          score += upgrade["value"]*upgrade["upgradeValue"]*+JSONAutoclickers[autoclicker]["number"] + upgrade["value"]*(Math.pow(+JSONAutoclickers[autoclicker]["value"],2)*10)
        }
      })
    })
    this.setState({
      score: Math.round(score)
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
	}

  humanFighting() { // Riposte des humains

    this.setState({ areFighting: true, })

    this.humansTimer = setInterval(() => {

      if(this.state.zombies < 100) {
        destroyZombies = 0.5
      }

      if(this.state.zombies > 100) {
        destroyZombies = 1
        let test = Math.floor(Math.random()*30)
        if(1 === test) {
          randomAttack = Math.floor(Math.random()*4)
          destroyZombies = riposte[randomAttack][1]
        }
      }

      if(this.state.zombies > 500) {
        destroyZombies = 10
        if(1 === Math.floor(Math.random()*100)) {
          destroyZombies = riposte[4][1];
        }
      }
      this.setState({
        zombies: Math.floor(this.state.zombies) - destroyZombies
      })
    }, 1000)

  }

  winLose() {
    this.state.humans <= 0 || this.state.zombies < 0 ? this.setState({ winLose: true, }) : null
    if(this.state.humans <= 0){
      imgEnd = win
    }
    else if (this.state.zombies < 0){
      imgEnd = lose
    }
  }

  render() {

    let zombiesTop = format(Math.floor(this.state.zombies))
    document.title = zombiesTop < 0 ? "You lost - The Clicking Dead" : zombiesTop + " zombies - The Clicking Dead"

    let zombiesInt = Math.floor(this.state.zombies)
    let humans = format(Math.floor(this.state.humans))
    let humansAll = Math.floor(this.state.humans).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const tooltipAllHumans = (
      <Tooltip id="tooltip">{humansAll}</Tooltip>
    )

    if(!this.state.areFighting && zombiesInt === 10 && !this.state.winLose) { // Humans are fighting back
      this.humanFighting()
    }

    let humanAttack = randomAttack ? riposte[randomAttack][0] : null
    let lostZombies = randomAttack ? riposte[randomAttack][1] : null
    let attack = ""
    if(humanAttack !== null) {
      attack = humanAttack + ", you have lost " + lostZombies + " zombies"
       setTimeout(function(){ attack = "" }, 3000)
    }

    if(!this.state.winLose){
      this.winLose()
      console.log("TEST")
    }

    return ( <div>
      <div id="modal">
				<Modal
					isOpen={this.state.winLose}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Login"
				>
            <img src={imgEnd}/>
				</Modal>
			</div>


      {!this.state.userId || this.state.userId <= 0 ? <div>
        <Login/>
      </div> : <div>
        <nav className="navbar fixed-top navbar-expand-sm" id="mainNav">
        <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#fullNav" aria-controls="fullNav" aria-expanded="false" aria-label="Toggle navigation">
				 Menu <i className="fa fa-bars" aria-hidden="true"></i>
			  </button>
        <div className="collapse navbar-collapse" id="fullNav">
          <Nav className="navbar-nav ml-auto">
            <NavItem>
              <i className="fa fa-user" aria-hidden="true"></i>
              <Profile
                username={this.state.username}
                achievements={this.state.achievements}
              />
            </NavItem>
            <NavItem>
              <i className="fa fa-trophy" aria-hidden="true"></i><Leaderboard userId = {this.state.userId} />
            </NavItem>
            <NavItem>
              <i className="fa fa-sign-out" aria-hidden="true"></i><Login/>
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
              <Row className="info">
                <Col md="4" className="left"> {nameContinent} {nbZombiesContinent}%</Col>
                <Col md="4" className="center">Infection : {Math.floor(this.state.autoClickTotal* 10) / 10} /s</Col>
                <Col md="4" className="right">Resistance : -{destroyZombies} /s</Col>
              </Row>
              <p className="attackInfo">{attack}</p>

              <Map
                zombies = {zombiesInt}
                continentName = {this.continentName}
                attackHuman = {randomAttack ? riposte[randomAttack][0] : null}
                lostZombies = {randomAttack ? riposte[randomAttack][1] : null}
              />

              <Row id="stats">
                <Col md="6" className="text-right">
                  <div className="statsContent">
                    <h3>Zombies</h3>
                    <p>{zombiesInt < 0 ? "0" : zombiesInt}</p>
                  </div>
                </Col>
                <Col md="6" className="text-left">
                  <div className="statsContent">
                    <h3>Humans</h3>
                    <OverlayTrigger placement="bottom" overlay={tooltipAllHumans}>
                      <p>{humans < 0 ? "0" : humans}</p>
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
          <Achievement
            data={this.state.achievements}
            iduser = {this.state.userId}
            click={this.state.zombies}
            randomAttack = {randomAttack}
            autoclicker={this.state.autoClickTotal}
          />
        </div>
      </div> }
    </div> )

  }
}

export default Game
