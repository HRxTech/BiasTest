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

            client.getAsset('31ZiBpxq9OqwEyEIyy4OW2')
            .then((asset) => {
                console.log(asset)
                this.setState({ iconImg: asset.fields.file.url })
                this.setState({ IconImgAlt: asset.fields.title })
            })
            .catch(console.error);
    }

    render() {
        return (
            <div className="Header">
                <img src={this.state.logoImg} alt={this.state.logoImgAlt} style={{'width':50, 'padding-right':200, 'padding-top':15}} />
                <img src={this.state.iconImg} alt={this.state.iconImgAlt} style={{'width':25, 'color':"#BFC5D2", 'padding-top':15}}/>
            </div>
        );
    }
}

export default Header;