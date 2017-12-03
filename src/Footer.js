import React, { Component } from 'react';
import './font-awesome-4.7.0';

class Footer extends Component {
  render() {
    var FontAwesome = require('react-fontawesome');
    return (
      <div>
      <p>SHARE THIS TEST</p>

      <a href="#">
        <FontAwesome  name='linkedin-square' />
      </a>

      <a href="#">
        <FontAwesome  name='facebook-square' />
      </a>

      <a href="#">
        <FontAwesome  name='twitter-square' />
      </a>

      <p>© HRX TECHNOLOGY 2017</p>
      </div>
    );
  }
}

export default Footer;