import React, { Component } from 'react';
import { createClient } from 'contentful'
import {withRouter} from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import './Header.css';

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
            logoImgAlt: ''
        }
        this.onClickHome = this.onClickHome.bind(this);
    }

    componentWillMount() {
        client.getAsset('6D9jqlo0CIukmyS6CAM4Uk')
            .then((asset) => {
                // console.log(asset)
                this.setState({ logoImg: asset.fields.file.url })
                this.setState({ logoImgAlt: asset.fields.title })
            })
            .catch(console.error);
    }

    onClickHome() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="Header">
                <img onClick={this.onClickHome} src={this.state.logoImg} alt={this.state.logoImgAlt} />
                <FontAwesome className="question"
                    name='question-circle'
                    size='2x'
                    style={{ 'color': "#BFC5D2", 'paddingTop': 15 }}
                    alt='More Info'
                />
            </div>
        );
    }
}

export default withRouter(Header);