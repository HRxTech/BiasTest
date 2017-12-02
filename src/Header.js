import React, { Component } from 'react';
import axios from 'axios';



class Header extends Component {
    constructor(props){
        super(props);
        this.state = {logo:'', icon:''}
    }
    componentWillMount(){
        axios.get('https://images.contentful.com/4xbeshmjlgqs/6D9jqlo0CIukmyS6CAM4Uk/12584fff1ec639b2e92ff904c7f0126a/37685_HRx_logo_.svg')
        .then((response) => {
           this.setState({logo:response.data}); 
        });
    
        axios.get('https://images.contentful.com/4xbeshmjlgqs/31ZiBpxq9OqwEyEIyy4OW2/7117ba82feb446563b17f9000ca711ba/question.svg')
        .then((response) => {
           this.setState({icon:response.data}); 
        });
    }

  render() {
        return(
            <div>
            <img src={this.state.logo} className="logo" alt="logo" />
            <img src={this.state.icon} className="icon" alt="question" />
            </div>
        );
  }
}

export default Header;