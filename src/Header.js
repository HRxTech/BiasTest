import React, { Component } from 'react';
var contentful = require('contentful');

var client = contentful.createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
  })

class Header extends Component {
    constructor(props){
        super(props);
        
    }
    
    componentWillMount(){  
        this.setState({ isLoading : true });
        client.getAsset('6D9jqlo0CIukmyS6CAM4Uk')
        .then((asset) => {
            console.log(asset)
            this.setState({ isLoading : false })
        })
        .catch(console.error);

    }

  render() {
      if(this.state.isLoading){
        return(
            <div>
            <img src={fields.file.url} alt={fields.title} />
            </div>
        );
    }
  }
}

export default Header;