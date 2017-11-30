import React, { Component } from 'react';
import HRx_logo from './HRx_logo.svg';


class Header extends Component {
  render() {
    return (
        <img src={HRx_logo} className="HRx-logo" alt="logo" />
    );
  }
}

export default Header;