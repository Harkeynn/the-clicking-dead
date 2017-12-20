import React, { Component } from 'react'
import Modal from 'react-modal'
import { Scrollbars } from 'react-custom-scrollbars';
import {totalAchievements} from './achievement';
import { filter } from 'lodash';

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

let userAchievements = []

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "Test",
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

	loadAchievements() { // Trier les achievements de l'user
		userAchievements = [];
      for (let i = 0; i < totalAchievements.length; i++) {
      	userAchievements = userAchievements.concat(filter(this.props.achievements, ["id", totalAchievements[i]]))
      }
  }

  render() {
		this.loadAchievements()
    return (
      <div id="modal">
				<a data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>{this.props.username}</a>
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
							<h2>{this.props.username}</h2>
						</div>

						<div className="modalBody" id="popupUser">

              <h3>Achievements</h3>

              <div id="profilAchievements">

	              <Scrollbars>

								{this.props.achievements ? userAchievements.map((val, i) => { return ( <div key={i} className="profilAchievementsBox">
									<p><b>{val.libelle}</b></p>
									<p className="how"><i>{val.description}</i></p>
								</div> )}) : null}

                </Scrollbars>

              </div>

              <hr />

              <h3>Change Password</h3>

              <form>
                <div id="input">
                  <input type="text" placeholder="New password"/>
                  <input type="text" placeholder="Confirm new password"/>
                </div>
                <input type="button" value="Change" />
              </form>

						</div>
					</div>


				</Modal>
			</div>
    )
  }
}

export default Profile
