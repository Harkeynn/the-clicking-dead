import React, { Component } from 'react'
import Modal from 'react-modal'
import { Scrollbars } from 'react-custom-scrollbars';
import {totalAchievements} from './achievement';
import { filter } from 'lodash';
import updatePassword from '../api/updatePassword'

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
      passone: "",
      passtwo: "",
      messageChangePassword: "",
      disabled: "disabled"
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handlePassoneChange = (e) => {
		this.setState({
			passone: e.target.value
    })

    this.comparePassword(e.target.value, this.state.passtwo);

	}
	handlePasstwoChange = (e) => {
		this.setState({
			passtwo: e.target.value
    })

    this.comparePassword(e.target.value, this.state.passone);
	}

  comparePassword(valone, valtwo) {

    if(valone == valtwo) {
      this.setState({
        messageChangePassword: "Password are the same"
      })
      document.getElementById("buttonRec").disabled = false;

    } else {
        this.setState({
          messageChangePassword: "Password are not the same"
        })
        document.getElementById("buttonRec").disabled = true;
      }
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

  handleSubmit = (e) => {
    e.preventDefault()
    updatePassword.updatePaswword(this.state.passone);
    
    this.setState({messageChangePassword: "The Password has been correctly modified"})
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

              <form onSubmit={this.handleSubmit}>
                <div id="input">
                <input
									id="passone"
									placeholder="Password"
									type="password"
									className="validate"
									value={this.state.passone}
									onChange={this.handlePassoneChange}
								/>
								<input
									id="passtwo"
									placeholder="Confirm Password"
									type="password"
									className="validate"
									value={this.state.passtwo}
									onChange={this.handlePasstwoChange}
								/>
                </div>
                <button type="submit" name="action" id="buttonRec" disabled>Change</button>

              </form>
              {this.state.messageChangePassword}

						</div>
					</div>

							
				</Modal>
			</div>
    )
  }
}

export default Profile
