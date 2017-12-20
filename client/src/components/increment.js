import React, { Component } from 'react'
import imgEurope from '../img/illustrations/0.png'
import imgAsia from '../img/illustrations/1.png'
import imgAfrica from '../img/illustrations/2.png'
import imgOceania from '../img/illustrations/3.png'
import imgNAmerica from '../img/illustrations/4.png'
import imgSAmerica from '../img/illustrations/5.png'
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

function grr() {
  let randomGrr = Math.floor(Math.random()*4)
  let arrGrr = ["Groar", "Grr", "Unng", "Oarh"]
  return arrGrr[randomGrr]
}

const duration = 2000;
let defaultStyle = {}
let transitionStyles = {}

class Increment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }

    const animationDuration = duration + duration / 2; // durée totale (slideUp + FadeOut)

    // Toutes les secondes, on nettoie les div +1 créés il y a plus de 500ms
    this.cleanerTimer = setInterval(() => {
      const now = Date.now();
      this.setState({
        items: this.state.items
          .filter(item => now - item < animationDuration)
      })
    }, 200);
  }

  // Updates number of zombies on button click
  handleIncrement = (event) => {

    let posX = event.clientX - 15;
    let posY = event.clientY - 27;

    defaultStyle = {
      position: 'absolute',
      transition: `top ${duration}ms ease-out, opacity ${duration/2}ms ease-out 200ms`,
      top: posY,
      left: posX,
    }

    transitionStyles = {
      entering: { top: posY, left: posX, opacity: 1 },
      entered:  {
        top: -100,
        opacity: 0,
      },
    };

    const item = Date.now();
    this.setState({
      zombies: this.props.zombies + 1,
      items: this.state.items.concat([item]),
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
        console.log("LOADING IMAGE")
    }

    return ( <div className="zombieImg" style={{backgroundImage : "url(" + img + ")"}} onClick={this.handleIncrement}>
        <TransitionGroup>
          {this.state.items.map(item => {
            return (
              <Transition
                key={item}
                timeout={0}
              >
              {(state) => {
                return (
                  <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}>
                    {grr()}
                  </div>
                )
              }}
              </Transition>
            )
          })}
        </TransitionGroup>
    </div> )
  }
}

export default Increment
