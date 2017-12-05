import React, { Component } from 'react';

class Footer extends Component {
  render() {
    var FontAwesome = require('react-fontawesome');
    return (
      <div>
      <p>SHARE THIS TEST</p>

      <a>
        <FontAwesome  name='linkedin-square' />
      </a>

      <a>
        <FontAwesome  name='facebook-square' />
      </a>

      <a>
        <FontAwesome  name='twitter-square' />
      </a>

      <p>© HRX TECHNOLOGY 2017</p>
      </div>
    );
  }
}

export default Footer;