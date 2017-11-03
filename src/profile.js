import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    },
  };

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "Bob Razowski",
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
        <div id="modal">
            <button data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>Profile</button>
            <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <h4>{this.state.username}</h4>
                <p>This is your awesome profile !</p>
                <button className="btn modal-trigger" onClick={this.closeModal}>close</button>
            </Modal>
        </div>
    )
  }
}

export default Profile
