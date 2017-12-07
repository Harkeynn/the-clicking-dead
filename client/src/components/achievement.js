import React, { Component } from 'react'
import icon from '../img/illustrations/icon_test.jpg'

class Achievement extends Component {




  render(){
    return(
      <div className="col-12 col-md-3">
				<div className="achievementBox">
					<img className="img-fluid" src={icon} />
					<div>
						<p><b>Sir, do you know how fast you were clicking ?</b></p>
						<p className="how"><i>100 clicks in one second</i></p>
					</div>
				</div>
			</div>
    )
  }

}

export default Achievement
