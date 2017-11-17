 	import React, { Component } from 'react'
import Modal from 'react-modal'
import Signin from './signin'
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

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			modalIsOpen: true,
			nickname: '',
			password: ''
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
    handleSubmit = (e) => {
		e.preventDefault()
		fetch(`http://localhost:1973/game`, {
			mode: 'cors',
			method: 'post',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: {
				"username": this.state.username,
				"password": this.state.password
			}
		})
		.then((res) => {
			console.log('MAXXX : ' + res);
      return res.json()
    })
    .then(jsonData => {
			if(jsonData === null) throw new Error("This account doesn't exist !!")
			if(passwordHash.verify(this.state.password, jsonData.password)){
				this.closeModal()
			}else{
				throw new Error("Bad nick/pw")
			}
		})
		.catch(err => {
			console.log(err)
		})
	}



	render() {
		return (
			<div id="modal">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Login"
				>
					<h2 className="center-align">Login</h2>
					<div className="row">
						<form className="col s12" onSubmit={this.handleSubmit}>
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
								<div className="col m12">
									<p className="center-align">
										<button className="btn btn-large waves-effect waves-light" type="submit" name="action">Login</button>
									</p>
								</div>
							</div>
						</form>

						{/*<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label>Username</label>
								<input type="text" className="form-control" name="username" value={this.state.nickname}/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" name="password" value={this.state.password} />
							</div>
							<button type="submit" className="btn btn-warning btn-lg">Login</button>
						</form>
						<div className="col m12">
							<Signin />
						</div>*/}
					</div>
				</Modal>
			</div>
		)
	}
}

export default Login