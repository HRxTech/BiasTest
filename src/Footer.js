import React, { Component } from 'react';

class Footer extends Component {
  render() {
    var FontAwesome = require('react-fontawesome');
    return (
      <div className="Footer" style={{'background-color':"#BFC5D2"}}>
        <p>SHARE THIS TEST</p>

        <a href="#">
          <FontAwesome name='linkedin-square' 
                      size = '2x'
                      style={{'color':"#19223D", 'padding-right':15}}
          />
        </a>

        <a href="#">
          <FontAwesome name='facebook-square' 
                      size = '2x'
                      style={{'color':"#19223D",'padding-right':15}}
          />
        </a>

        <a href="#">
          <FontAwesome name='twitter-square' 
                      size = '2x'
                      style={{'color':"#19223D"}}
          />
        </a>

        <p>© HRX TECHNOLOGY 2017</p>
      </div>
    );
  }
}

export default Footer;