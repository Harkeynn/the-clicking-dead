import React, { Component } from 'react'
import Modal from 'react-modal'
import Signin from './signin'
const passwordHash = require('password-hash')
// const userData = require('./../../../api/userdata')
// const userId = userData.id;

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

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			modalIsOpen: true,
			// modalIsOpen: true,
			nickname: '',
			password: ''
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
        this.testModal = this.testModal.bind(this)
	}

    componentDidMount() {
       this.testModal();
    }
    openModal() {
        this.setState({ modalIsOpen: true })
	}
	
    logout() {
		fetch('http://localhost:1973/logout')
		.then((res) => {
			return res.json()
		})
		.then(jsonData => {
			window.location.reload();
		});
}

	testModal() {
		console.log("TESSST MODAL");
		let result = true;
        fetch('http://localhost:1973/user')
            .then((res) => {
                return res.json()
            })
            .then(jsonData => {
                console.log("result " + jsonData.shouldModalBeOpened);
                result = jsonData.shouldModalBeOpened;
                this.setState({ modalIsOpen: result })

            });

        console.log("state before setstate " + result);
	}

	closeModal() {
		this.setState({ modalIsOpen: false })

        fetch('http://localhost:1973/userid')
		.then((res) => {
			return res.json()
		})
		.then(jsonData => {
			let userid = jsonData.userid;
			console.log("result " + userid);


		});
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
        fetch('http://localhost:1973/game', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
			mode: 'cors',
            body: JSON.stringify({
                username: this.state.nickname,
                password: this.state.password,
            })
        }).then((res) => {
        	if(res.status === 200){
                this.closeModal()
            }
 		})
	}

	render() {
		return (
			<div id="modal">
				<a data-target="modal1" className="btn modal-trigger" onClick={this.logout}>Log Out</a>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					shouldCloseOnOverlayClick={false}
					contentLabel="Login"
				>
					
					<div class="modalContent">
					<a class="closeModal" onClick={this.closeModal}></a>
						<div className="modalHeader">
							<h2>Login</h2>
						</div>

						<div className="modalBody">

							<form onSubmit={this.handleSubmit}>
								<input 
									id="nickname"
									placeholder="Username"
									type="text"
									className="validate"
									value={this.state.nickname}
									onChange={this.handleNicknameChange} 
								/>
								<br />
								<input 
									id="pass"
									placeholder="Password"
									type="password"
									className="validate"
									value={this.state.password}
									onChange={this.handlePasswordChange} 
								/>
								<br />
								
								<button type="submit" name="action">Login</button>
							</form>
							<br/>
							<Signin />
						</div>
					</div>

							
				</Modal>
			</div>
		)
	}
}

export default Login
