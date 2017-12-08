import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>SHARE THIS TEST</p>
        <a href="">
          <FontAwesome className="fontawesome"
            name='linkedin-square' 
            size = '2x'
          />
        </a>
        <a href="">
          <FontAwesome className="fontawesome"
            name='facebook-square' 
            size = '2x'
          />
        </a>
        <a href="">
          <FontAwesome className="fontawesome"
            name='twitter-square' 
            size = '2x'
          />
        </a>
        <p>&copy; HRX TECHNOLOGY 2017</p>
      </div>
    );
  }
}

export default Footer;