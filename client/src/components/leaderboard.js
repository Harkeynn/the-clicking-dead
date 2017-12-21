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

  openModal() {
		this.setState({modalIsOpen: true})
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
  closeModal() { this.setState({modalIsOpen: false}) }


	getLeaderboard() {

		let scores = []
		let indexScores = []
		let topPlayers = []

		for(let i  = 0; i < this.state.dataUsers.length; i++) { // Get all scores
			scores.push([this.state.dataUsers[i].score, i])
		}

		function sortDate(a, b) { return (a[0] < b[0]) ? 1 : -1; }
		scores.sort(sortDate)


		let scoresSliced = scores.slice(0, 10) // Keep 10 first scores

		for(let i = 0; i < scoresSliced.length; i++) { // Get index of 10 best users

			topPlayers.push(this.state.dataUsers[scoresSliced[i][1]])
		}


		if(findIndex(topPlayers, ["id", this.props.userId]) === -1) { // IF user is not in the leaderboard, get his place
			player = filter(this.state.dataUsers, ["id", this.props.userId])
			for(let i = 0; i < scores.length; i++){
				if(scores[i][0] === player[0].score){
					playerIdx = i
				}
			}
		}

		return topPlayers;
	}


  render() {

		let leaderboard = [];
		this.state.dataUsers && this.props.userId > 0 ? leaderboard = this.getLeaderboard() : null;

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

									{leaderboard.map((val, i) => {
										return (<li key={i} id={val.id === this.props.userId ? "player" : null }>
											<p className="pseudo">{val.nickname}</p> <p>{val.score}</p>
										</li> )
							 		})}

									{findIndex(leaderboard, ["id", this.props.userId]) === -1 ? <li id="player" className="notBest">
										<span>{playerIdx + 2}.</span><p className="pseudo">{player[0].nickname}</p> <p>{player[0].score}</p>
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
