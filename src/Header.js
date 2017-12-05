import React, { Component } from 'react';
import { createClient } from 'contentful'

// TODO: DRY - repeated code.
var client = createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
})

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoImg: '', // http://via.placeholder.com/150x150
            logoImgAlt: '',
            iconImg:'',
            iconImgAlt:''
        }
    }

    componentWillMount() {
        client.getAsset('6D9jqlo0CIukmyS6CAM4Uk')
            .then((asset) => {
                console.log(asset)
                this.setState({ logoImg: asset.fields.file.url })
                this.setState({ logoImgAlt: asset.fields.title })
            })
            .catch(console.error);
    }

    render() {
        var FontAwesome = require('react-fontawesome');
        return (
            <div className="Header">
                <img src={this.state.logoImg} alt={this.state.logoImgAlt} style={{'width':50, 'padding-right':200, 'padding-top':15}} />
                <a href="#">
                    <FontAwesome name='question-circle' 
                                 size='2x' 
                                 style={{'color':"#BFC5D2", 'padding-top':15}}
                                 alt='More Info'
                    />
                </a>
            </div>
        );
    }
}

export default Header;