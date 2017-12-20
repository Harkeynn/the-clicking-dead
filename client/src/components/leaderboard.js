import React, { Component } from 'react'
import Modal from 'react-modal'
import { findIndex, filter } from 'lodash';

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: '500px',
		transform: 'translate(-50%, -50%)',
		padding: '0px',
		border: 'none',
		boxShadow: '0 0 10px black'
	},
}

let player;
let playerIdx;

class Leaderboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
			dataUsers: ""
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

	componentDidMount(){
		fetch('http://localhost:1973/accounts/')
		.then((res) => {
			return res.json()
		})
		.then(jsonData => {
			this.setState ({
				dataUsers : jsonData,
			})
		})
	}

  openModal() { this.setState({modalIsOpen: true}) }
  closeModal() { this.setState({modalIsOpen: false}) }


	getLeaderboard() {
		let scores = []
		let indexScores = []
		let topPlayers = []

		for(let i  = 0; i < this.state.dataUsers.length; i++) { // Get all scores
			scores.push(this.state.dataUsers[i].score)
		}

		scores.sort( (a,b) => b-a ) // Sort scores
		let scoresSliced = scores.slice(0, 10) // Keep 10 first scores

		for(let i = 0; i < scoresSliced.length; i++) { // Get index of 10 best users
			indexScores.push(findIndex(this.state.dataUsers, ["score", scoresSliced[i]]))
			scoresSliced.splice(i, 1)
			topPlayers.push(this.state.dataUsers[indexScores[i]])
			indexScores = []
			i--
		}

		if(findIndex(topPlayers, ["id", this.props.userId]) === -1) { // IF user is not in the leaderboard, get his place
			player = filter(this.state.dataUsers, ["id", this.props.userId])
			playerIdx = scores.indexOf(player[0].score)
		}

		return topPlayers;
	}


  render() {
    return (
      <div id="modal">
				<a data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>Leaderboard</a>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Login"
				>
					<div className="modalContent" id="popupLeaderboard">
					<a className="closeModal" onClick={this.closeModal}></a>
						<div className="modalHeader">
							<h2>Login</h2>
						</div>

						<div className="modalBody">

							  {this.state.dataUsers && this.props.userId > 0 ? <ul>

									{this.getLeaderboard().map((val, i) => {
										return (<li key={i} id={val.id === this.props.userId ? "player" : null }>
											<p className="pseudo">{val.nickname}</p> <p>{val.score}</p>
										</li> )
							 		})}

									{findIndex(this.getLeaderboard(), ["id", this.props.userId]) === -1 ? <li id="player" className="notBest">
										<span>{playerIdx + 1}.</span><p className="pseudo">{player[0].nickname}</p> <p>{player[0].score}</p>
									</li> : null }

								</ul> : null }

						</div>
					</div>


				</Modal>
			</div>
    )
  }
}

export default Leaderboard
