import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        position         : 'fixed',
        top              : 0,
        left             : 0,
        right            : 0,
        bottom           : 0,
        backgroundColor  : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
		top              : '50%',
		left             : '50%',
		right            : 'auto',
		bottom           : 'auto',
		marginRight      : '-50%',
		width            : '500px',
		transform        : 'translate(-50%, -50%)'
    },
};

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: true,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

	tryLogin() {
		console.log("Tentative de log");
	}

  render() {
    return (
        <div id="modal">
            <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            contentLabel="Example Modal"
            >
            <h2 className="center-align">Login</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate"/>
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="pass" type="password" className="validate"/>
                            <label htmlFor="pass">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m12">
                            <p className="center-align">
                                <button className="btn btn-large waves-effect waves-light" type="button" name="action" onClick={this.tryLogin}>Login</button>
                            </p>
                        </div>
                        <div className="col m12">
                            <p className="right-align">
                                <a href="signin">Sign in</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            </Modal>
        </div>
    )}
}

export default Login