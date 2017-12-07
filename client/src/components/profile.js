import React, { Component } from 'react'
import Modal from 'react-modal'
import { Scrollbars } from 'react-custom-scrollbars';

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

  render() {
    return (
      <div id="modal">
				<a data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>Profile</a>
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
							<h2>Profile</h2>
						</div>

						<div className="modalBody" id="popupUser">

              <h3>Achievements</h3>
            
              <div id="profilAchievements">
            
                <Scrollbars>
            
                  <div class="profilAchievementsBox">
                    <p><b>Sir, do you know how fast you were clicking ?</b></p>
                    <p class="how"><i>100 clicks in one second</i></p>
                  </div>
            
                  <div class="profilAchievementsBox">
                    <p><b>Evolution is a lie</b></p>
                    <p class="how"><i>Upgrade your zombies for the first time</i></p>
                  </div>
            
                  <div class="profilAchievementsBox">
                    <p><b>Sir, do you know how fast you were clicking ?</b></p>
                    <p class="how"><i>100 clicks in one second</i></p>
                  </div>
            
                  <div class="profilAchievementsBox">
                    <p><b>Sir, do you know how fast you were clicking ?</b></p>
                    <p class="how"><i>100 clicks in one second</i></p>
                  </div>
            
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
