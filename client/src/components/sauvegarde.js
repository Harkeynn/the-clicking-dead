import React, { Component } from 'react'
import Modal from 'react-modal'
import addLeaderboard from '../api/addLeaderboard'

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
  }

class Sauvegarde extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
      modalIsOpen: false,
      score: 0
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
    this.setState({
      score: this.props.score
    })
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  handleNicknameChange = (e) => {
		this.setState({
			nickname: e.target.value
		})
  }
  handleSave = (e) => {
    e.preventDefault()
		addLeaderboard.addLeaderboard(this.state)
		this.closeModal
  }

  render() {
    return (
        <div id="modal">
            <button data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>Sauvegarder la partie</button>
            <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <h4>{this.state.username}</h4>
                <p>Votre score : {this.state.score}</p>
                <p>Enregistrer le !</p>
                <form className="col s12" onSubmit={this.handleSave}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="nickname"
                        type="text"
                        className="validate"
                        value={this.state.nickname}
                        onChange={this.handleNicknameChange} />
                      <label htmlFor="username">Username</label>
                    </div>
                  </div>
                  <button className="btn modal-trigger" type="submit">Enregistrer !</button>
                </form>
                <button className="btn modal-trigger" onClick={this.closeModal}>Fermer</button>
            </Modal>
        </div>
    )
  }
}

export default Sauvegarde
