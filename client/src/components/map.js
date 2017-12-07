import React, { Component } from 'react'
import mappAll from '../img/maps/map_all.svg'
import mappSouthAmeria from '../img/maps/map_south_america.svg'
import mappNorthAmeria from '../img/maps/map_north_america.svg'
import mappEurope from '../img/maps/map_europe.svg'
import mappAsia from '../img/maps/map_asia.svg'
import mappOceania from '../img/maps/map_oceania.svg'
import mappAfrica from '../img/maps/map_africa.svg'
import { log } from 'util';

var shuffle = require('shuffle-array')

const continents = [
  ["Europe", 743.1],
  ["Oceania", 40.5],
  ["South America", 422.5],
  ["Asia", 4436],
  ["North America", 579],
  ["Africa", 1216],
]
shuffle(continents)

const init = [0,0,0,0,0,0,0,0]
let [ percentOpacityEurope, percentOpacityAsia, percentOpacityNorthAmerica, percentOpacitySAmerica,
  percentOpacityAfrica, percentOpacityOceania, popAllPreviousContinent, nbZombiesContinent] = init

let nContinent = 0
let continentInvaded = "Europe"


class Map extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }


zombiesInvasion(continent){

    let popAllPreviousContinent = 0 // Population de tous les continents envahis

    for(let i=0 ; i<continent ; i++){ // Entre dans la boucle à la fin de la première invasion
        popAllPreviousContinent = popAllPreviousContinent + continents[i][1]
    }

    let nbZombies = this.props.zombies
    nbZombiesContinent = Math.floor((nbZombies-popAllPreviousContinent)*100 / continents[continent][1])

    continentInvaded = continents[continent][0]
    let thisPercent = nbZombiesContinent / 100

    switch (continents[continent][0]){
        case "Europe" :
            percentOpacityEurope = thisPercent
            break
        case "Asia" :
            percentOpacityAsia = thisPercent
            break
        case "Africa" :
            percentOpacityAfrica = thisPercent
            break
        case "Oceania" :
            percentOpacityOceania = thisPercent
            break
        case "North America" :
            percentOpacityNorthAmerica = thisPercent
            break
        case "South America" :
            percentOpacitySAmerica = thisPercent
            break
        default :
          console.log("ERROR")
    }

    this.props.continentName(continents[nContinent][0])

}



  render(){


    let humanAttack = this.props.attackHuman
    if(humanAttack !== null) { setTimeout(function(){ humanAttack = null; }, 20000); }


    if (nbZombiesContinent < 0 && nContinent > 0) { // Pourcentage inférieur à 0%
      nContinent--
      this.zombiesInvasion(nContinent)
    } else if (nbZombiesContinent < 100) {
      this.zombiesInvasion(nContinent)
    } else { // Pourcentagesupérieur ou égal à 100%
        nContinent++
        this.zombiesInvasion(nContinent)
    }

    console.log("NORTH AMERICA : " + percentOpacityNorthAmerica)

    return(
        <div className="mapAll">
            <p className="infoMap">Zombies are invaded {continentInvaded} at {nbZombiesContinent}%</p>
            <p className="infoMap">{humanAttack}</p>
            <div id="worldMap">
                <div><img src={mappAll} alt="All" /></div>
                <div id="southAmerica" style={{opacity : percentOpacitySAmerica}} className="map"><img src={mappSouthAmeria} alt="South America" /></div>
                <div id="northAmerica" style={{opacity : percentOpacityNorthAmerica}} className="map"><img src={mappNorthAmeria} alt="North America" /></div>
                <div id="europe" style={{opacity : percentOpacityEurope}} className="map"><img src={mappEurope} alt="Europe" /></div>
                <div id="asia" style={{opacity : percentOpacityAsia}} className="map"><img src={mappAsia} alt="Asia" /></div>
                <div id="africa" style={{opacity : percentOpacityAfrica}} className="map"><img src={mappAfrica} alt="Africa" /></div>
                <div id="oceania" style={{opacity : percentOpacityOceania}} className="map"><img src={mappOceania} alt="Oceania" /></div>
            </div>
          </div>
    )
  }

}

export default Map
