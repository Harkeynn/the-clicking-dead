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
		backgroundColor: 'rgba(255, 255, 255, 0.75)'
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: '500px',
		transform: 'translate(-50%, -50%)'
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
					password: this.state.password
				}, () => {

                    fetch('http://localhost:1973/signup', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: this.state.nickname,
                            password: this.state.password,
                        })
                    }).then((res) => {
                        this.closeModal()
                    })
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
				<p className="right-align">
					<a style={{ cursor: 'pointer' }} onClick={this.openModal}>SignIn</a>
				</p>
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

















						{/*<form className="col s12" onSubmit={this.handleSubmit}>*/}
							{/*<div className="row">*/}
								{/*<div className="input-field col s12">*/}
									{/*<input id="mail"*/}
										{/*type="email"*/}
										{/*className="validate"*/}
										{/*value={this.state.mail}*/}
										{/*onChange={this.handleEmailChange} />*/}
									{/*<label htmlFor="username">Email</label>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="row">*/}
								{/*<div className="input-field col s12">*/}
									{/*<input id="nickname"*/}
										{/*type="text"*/}
										{/*className="validate"*/}
										{/*value={this.state.nickname}*/}
										{/*onChange={this.handleNicknameChange} />*/}
									{/*<label htmlFor="username">Nickname</label>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="row">*/}
								{/*<div className="input-field col s12">*/}
									{/*<input id="pass"*/}
										{/*type="password"*/}
										{/*className="validate"*/}
										{/*value={this.state.password}*/}
										{/*onChange={this.handlePasswordChange} />*/}
									{/*<label htmlFor="pass">Password</label>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="row">*/}
								{/*<div className="input-field col s12">*/}
									{/*<input id="confirm"*/}
										{/*type="password"*/}
										{/*className="validate"*/}
										{/*value={this.state.passwordV}*/}
										{/*onChange={this.handlePasswordVChange} />*/}
									{/*<label htmlFor="pass">Confirm Password</label>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="row">*/}
								{/*<div className="col m12">*/}
									{/*<p className="center-align">*/}
										{/*<button className="btn btn-large waves-effect waves-light" type="submit">Sign in</button>*/}
										{/*<button className="btn btn-large waves-effect waves-light" type="button" name="action" onClick={this.closeModal}>Fermer</button>*/}
									{/*</p>*/}
								{/*</div>*/}
							{/*</div>*/}
						{/*</form>*/}
					</div>
				</Modal>
			</div>
		)
	}
}

export default Signin