// import React, { Component } from 'react'
// import Modal from 'react-modal'
// import addLeaderboard from '../api/addLeaderboard'
// import { setTimeout } from 'timers';


// class Sauvegarde extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       nickname: '',
//       modalIsOpen: false,
//       score: 0
//     }
//     this.openModal = this.openModal.bind(this)
//     this.closeModal = this.closeModal.bind(this)
//   }

//   // openModal() {
//   //   this.setState({modalIsOpen: true})
//   //   this.setState({
//   //     score: this.props.score
//   //   })
//   // }

//   // closeModal() {
//   //   this.setState({modalIsOpen: false})
//   // }

//   // handleNicknameChange = (e) => {
// 	// 	this.setState({
// 	// 		nickname: e.target.value
// 	// 	})
//   // }
//   // handleSave = (e) => {
//   //   e.preventDefault()
// 	// 	addLeaderboard.addLeaderboard(this.state)
// 	// 	this.closeModal
//   // }

//   saveUserStats(callback){
//       console.log('save');
//       callback();
//   }

//   timeoutBeforeSave(){
//     setTimeout(function(){
//       saveUserStats(timeoutBeforeSave)
//     }, 10000)
//   }

//   render() {

//     }
// }

// export default Sauvegarde
