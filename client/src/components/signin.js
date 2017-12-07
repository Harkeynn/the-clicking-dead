import React, { Component } from 'react'
import Modal from 'react-modal'
import AddUser from '../api/addUser'
const passwordHash = require('password-hash')

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0)'
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

class Signin extends Component {

	constructor(props) {
		super(props)
		this.state = {
			modalIsOpen: false,
			email: '',
			nickname: '',
			password: '',
			passwordV: '',
			submited: false
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	openModal() {
		this.setState({ modalIsOpen: true })
	}

	closeModal() {
		this.setState({ modalIsOpen: false })
	}

	handleEmailChange = (e) => {
		this.setState({
			email: e.target.value
		})
	}
	handleNicknameChange = (e) => {
		this.setState({
			nickname: e.target.value
		})
	}
	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value
		})
	}
	handlePasswordVChange = (e) => {
		this.setState({
			passwordV: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		try{
				if(this.state.password === this.state.passwordV){
				this.setState({
					password: passwordHash.generate(this.state.password)
				}, () => {
					AddUser.addUser(this.state)
					this.closeModal()
				})
			}else{
				throw new Error("Les mots de passe ne correspondent pas !")
			}
		}
		catch(err){
			alert(err)
		}
		
	}

	render() {

		return (

			<div id="modal">
				<a data-target="modal1" className="btn modal-trigger" onClick={this.openModal}><b>No account yet ? Sign up !</b></a>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Signin"
				>
					<div class="modalContent">

						<div className="modalHeader">
							<h2>Sign in</h2>
						</div>

						<div className="modalBody">

							<form onSubmit={this.handleSubmit}>
								<input 
									id="mail"
									placeholder="mail"
									type="email"
									className="validate"
									value={this.state.mail}
									onChange={this.handleEmailChange} 
								/>
								<br />
								<input 
									id="nickname"
									placeholder="username"
									type="text"
									className="validate"
									value={this.state.nickname}
									onChange={this.handleNicknameChange} 
								/>
								<br />
								<input 
									id="pass"
									placeholder="password"
									type="password"
									className="validate"
									value={this.state.password}
									onChange={this.handlePasswordChange} 
								/>
								<br /><br/>
								<input 
									id="confirm"
									placeholder="confirm password"
									type="password"
									className="validate"
									value={this.state.passwordV}
									onChange={this.handlePasswordVChange}
								/>
								<br />
								
								<button type="submit">Sign in</button>
							</form>
							<br/>
							<a onClick={this.closeModal}><b>Already have an account ? Login !</b></a>
						</div>
					</div>

							
				</Modal>
			</div>

			/*<div id="modal">
				<a style={{ cursor: 'pointer' }} onClick={this.openModal}><b>No account yet ? Sign up !</b></a>
				
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Example Modal"
				>
					<h2 className="center-align">Sign In</h2>
					<div className="row">
						<form className="col s12" onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="input-field col s12">
									<input id="mail"
										type="email"
										className="validate"
										value={this.state.mail}
										onChange={this.handleEmailChange} />
									<label htmlFor="username">Email</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input id="nickname"
										type="text"
										className="validate"
										value={this.state.nickname}
										onChange={this.handleNicknameChange} />
									<label htmlFor="username">Nickname</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input id="pass"
										type="password"
										className="validate"
										value={this.state.password}
										onChange={this.handlePasswordChange} />
									<label htmlFor="pass">Password</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input id="confirm"
										type="password"
										className="validate"
										value={this.state.passwordV}
										onChange={this.handlePasswordVChange} />
									<label htmlFor="pass">Confirm Password</label>
								</div>
							</div>
							<div className="row">
								<div className="col m12">
									<p className="center-align">
										<button className="btn btn-large waves-effect waves-light" type="submit">Sign in</button>
										<button className="btn btn-large waves-effect waves-light" type="button" name="action" onClick={this.closeModal}>Fermer</button>
									</p>
								</div>
							</div>
						</form>
					</div>
				</Modal>
			</div>*/
		)
	}
}

export default Signin