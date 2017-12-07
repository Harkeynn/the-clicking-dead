import React, { Component } from 'react'
import Modal from 'react-modal'

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

class Leaderboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
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
					<div class="modalContent" id="popupLeaderboard">
					<a class="closeModal" onClick={this.closeModal}></a>
						<div className="modalHeader">
							<h2>Login</h2>
						</div>

						<div className="modalBody">

              <ul>
                <li><p class="pseudo">Toto</p> <p>741 852</p></li>
                <li><p class="pseudo">Tigrou</p> <p>887 412</p></li>
                <li><p class="pseudo">Winnie</p> <p>875 652</p></li>
                <li><p class="pseudo">Porcinet</p> <p>654 213</p></li>
                <li><p class="pseudo">Coco</p> <p>612 741</p></li>
                <li><p class="pseudo">Bourriquet</p> <p>592 471</p></li>
                <li><p class="pseudo">Lumpy</p> <p>423 541</p></li>
                <li><p class="pseudo">Buster</p> <p>201 412</p></li>
                <li><p class="pseudo">Alpha</p> <p>45 478</p></li>
                <li><p class="pseudo">Omega</p> <p>1 257</p></li>
                <li id="player"><p class="pseudo">Username</p> <p>63</p></li>
              </ul>
              
						</div>
					</div>

							
				</Modal>
			</div>
    )
  }
}

export default Leaderboard
