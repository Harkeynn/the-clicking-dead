import React, { Component } from 'react'
import { findIndex, filter } from 'lodash';
import icon from '../img/illustrations/icon_test.jpg'
import { Row } from 'reactstrap'
import {continentInvaded, nbZombiesContinent} from './map';

let achievementUser = [] // Objets de "accountachievement" correspondant au user connecté
let totalAchievements = [] // Tous les ID des achievements débloqués par l'utilisateur | Depuis le chargement BDD
let visibleAchievements = [] // Les 4 ID des achievements à afficher
let filteredData = [] // Données des 4 achievements à afficher | Lié à visibleAchievements

class Achievement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      savedAchievement: "",
      isLoaded: false,
    }
  }

  componentDidMount() {
    // FETCH SAVEDACHIEVEMENT IN USERACHIEVEMENT
    fetch('http://localhost:1973/accountachievement')
    .then((res) => {
      return res.json()
    })
    .then(jsonData => {
      this.setState({
        savedAchievement: jsonData,
      })
    })
  }

  loadAchievements() { // Trier les achievements de l'user

    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true })
      totalAchievements = []
      achievementUser = filter(this.state.savedAchievement, ["iduser", +this.props.iduser]) // Récupérer les objets correspondants à l'user uniquement

      let arr = [];
      let newArr = [];

      for(let i = 0; i < achievementUser.length; i++) { // Get all achievements creation date
          let date = achievementUser[i].createdAt
          date = date.replace(/[-\. :T]/g, "").replace(/(000Z)/g, "")
          arr.push([date, i])
      }

      function sortDate(a, b) { return (a[0] > b[0]) ? 1 : -1; }
      arr.sort(sortDate) // Order from older to most achievements user

      for(let y = 0; y < arr.length; y++) { // Get achievements index in the right order
        newArr.push(arr[y][1])
      }

      for (let i = 0; i < achievementUser.length; i++) {
        totalAchievements.push(achievementUser[newArr[i]].idachievement) // Récupérer les ID des achievements de l'user
      }
    }

    this.fillTotalAchievement()
  }

  pushData(idUser, idAchievement) { // Ajouter les achievement au tableau et à la base
    if(totalAchievements.indexOf(idAchievement) === -1){
      totalAchievements.push(idAchievement)
      fetch('http://localhost:1973/accountachievement', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iduser: idUser,
          idachievement: idAchievement,
        }),
      })
    }
  }

  fillTotalAchievement() { // Débloquer les achievements

  // NUMBER OF ZOMBIES
    switch (this.props.click) {
      case 1 : // First Bite
        this.pushData(this.props.iduser, 1)
        break
      case 10 : // Squad
        this.pushData(this.props.iduser, 19)
        break
      case 50 : // Beginning of invasion
        this.pushData(this.props.iduser, 20)
        break
      case 100 : // Creation of an army
        this.pushData(this.props.iduser, 21)
        break
      case 500 : // Purge
        this.pushData(this.props.iduser, 22)
        break
      default :
        break
    }

  //CONTINENT
    this.continentInvaded("Oceania",8) // Welcome to nopeland
    this.continentInvaded("Europe",4) // Zombrexit
    this.continentInvaded("Asia",5) // Tentacule madness
    this.continentInvaded("North America",6) // Fast food
    this.continentInvaded("Africa",7) // No more hunger
    this.continentInvaded("South America",9) // The wall is broken

  //OTHER
    if (nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 2)} // One for all
    if (this.props.randomAttack) {this.pushData(this.props.iduser, 13)} // Karma is a bitch
    if (this.props.autoclicker > 0) {this.pushData(this.props.iduser, 14)} // Karma is a bitch
  //AUTOCLICKER
    visibleAchievements = totalAchievements.slice(-4);
    this.filterData()
  }

  continentInvaded(continent, idAchievement) { // Continent achievements
    if (continentInvaded === continent && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, idAchievement)}
  }

  filterData() { // Associer les ID des achievements à leurs données | Affichage
    filteredData = []; // Reinitialize
    for (var i = 0; i < visibleAchievements.length; i++) {
      let thisIndex = findIndex(this.props.data, ["id", visibleAchievements[i]])
      thisIndex !== -1 ? filteredData.push(this.props.data[thisIndex]) : null
    }
  }

  render() {

    this.state.savedAchievement ? this.loadAchievements() : null // Load les achievements de l'user

    return (
      <Row className="no-gutters" id="achievementsZone">

        {this.props.data ? filteredData.map((val, i) => {

          return ( <div key={i} className="col-12 col-md-3">
          <div className="achievementBox">
            <img className="img-fluid" src={val.image}/>
              <div>
                <p><b>{val.libelle}</b></p>
                <p className="how"><i>{val.description}</i></p>
              </div>
            </div>
          </div> )
        }) : null }

      </Row>
    )
  }
}

export default Achievement
export {totalAchievements}
