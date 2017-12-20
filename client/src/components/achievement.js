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
      for (let i = 0; i < achievementUser.length; i++) {
        totalAchievements.push(achievementUser[i].idachievement) // Récupérer les ID des achievements de l'user
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

  //NUMBER OF ZOMBIES
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
    //if (continentInvaded === "Oceania" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 8)} //Welcome to nopeland
    this.continentInvaded("Oceania",8) // Welcome to nopeland
    //if (continentInvaded === "Europe" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 4)} //Zombrexit
    this.continentInvaded("Europe",4) // Zombrexit
    //if (continentInvaded === "Asia" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 5)} //Tentacule madness
    this.continentInvaded("Asia",5) // Tentacule madness
    //if (continentInvaded === "North America" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 6)} //Fast food
    this.continentInvaded("North America",6)
    //if (continentInvaded === "Africa" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 7)} //No more hunger
    this.continentInvaded("Africa",7)
    //if (continentInvaded === "South America" && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 9)} //The wall is broken
    this.continentInvaded("South America",9)
  //OTHER
    if (nbZombiesContinent >= 100) {this.pushData(this.props.iduser, 2)} //One for all
  //AUTOCLICKER

    visibleAchievements = totalAchievements.slice(-4);
    this.filterData()
  }

  continentInvaded(continent, idAchievement) {
    if (continentInvaded === continent && nbZombiesContinent >= 100) {this.pushData(this.props.iduser, idAchievement)}
  }

  filterData() { // Associer les ID des achievements à leurs données | Affichage
    filteredData = []; // Reinitialize
    for (var i = 0; i < visibleAchievements.length; i++) {
      let thisIndex = findIndex(this.props.data, ["id", visibleAchievements[i]])
      thisIndex !== -1 ? filteredData.push(this.props.data[thisIndex]) : null
    }
  }


test() {
  let arr = [];
  for(let i = 0; i < achievementUser.length; i++) {
      let date = achievementUser[i].createdAt
    //  let newArr =
      arr.push(date.replace(/[-: .]/g, "").replace(/000Z/g, "") + i)
  }
console.log(arr)
}


  render() {

    this.state.savedAchievement ? this.loadAchievements() : null // Load les achievements de l'user
    this.state.savedAchievement ? this.test() : null

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
