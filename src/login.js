import React, { Component } from 'react';
import Modal from 'react-modal';

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
        transform: 'translate(-50%, -50%)'
    },
};

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
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

    render() {
        return (
            <div id="modal">
                <button data-target="modal1" className="btn modal-trigger" onClick={this.openModal}>Login</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className="center-align">Login</h2>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" type="text" className="validate" />
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="pass" type="password" className="validate" />
                                    <label for="pass">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col m12">
                                    <p className="center-align">
                                        <button className="btn btn-large waves-effect waves-light" type="button" name="action">Login</button>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Login