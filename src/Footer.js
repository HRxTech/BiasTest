import React, { Component } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

import './Footer.css';
import './App.css';

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');

class Footer extends Component {
  render() {

    const shareUrl = 'https://hrx-biastest.firebaseapp.com/';
    const title = 'HRx Bias Test';

    return (
      <div className="Footer">
        <p>SHARE THIS TEST</p>

        <div className="share-container">
          <div className="share-linkedin">
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              windowWidth={750}
              windowHeight={600}
              className="share-button">
              <LinkedinIcon
                iconBgStyle={'fill'}
                size={32}
                round />
            </LinkedinShareButton>
          </div>

          <div className="share-facebook">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="share-button">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
          </div>

          <div className="share-twitter">
            <TwitterShareButton
              url={shareUrl}
              quote={title}
              className="share-button">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
          </div>
        </div>

        <p>&copy; HRX TECHNOLOGY 2017</p>
      </div>
    );
  }
}

export default Footer;