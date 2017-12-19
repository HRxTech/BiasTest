import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import { ShareButtons,ShareCounts,generateShareIcon } from 'react-share';

  const {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
  } = ShareButtons;
  
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');

class Form extends Component {
    render() {
        const shareUrl = 'https://hrx-biastest.firebaseapp.com/';
        const title = 'HRx Bias Test';

        let score = this.props.score / 1000;
        let isBiasCompatible;

        if (score <= -0.15) {
            isBiasCompatible = false;
        } else if (score >= 0.15) {
            isBiasCompatible = true;
        }

        let strength;

        // Calculate strength
        if (score >= -0.15 && score < 0.15) {
            strength = "none";
        } else if ((score >= 0.15 && score < 0.35) || (score >= -0.35 && score < -0.15) ) {
            strength = "slightly";
        } else if ((score >= 0.35 && score < 0.65) || (score >= -0.65 && score < -0.35) ) {
            strength = "moderately";
        } else if ((score >= 0.65 && score < 2 || score >= -2 && score < -0.65) ) {
            strength = "strongly";
        } else {
            strength = "very strongly";
        }

        console.log(score);

        return (
            <div>
                <h1>{this.props.testTitle} Bias Test Results</h1>

                <div className='score'>
                    <p>Your score</p>
                    <p>{Math.round(score * 100) / 100}</p>
                </div>

                <div className='share-results'>
                    <p>Share your results</p>
                    <div className="Demo__container">        
                    <div className="Demo__some-network">        
                    <LinkedinShareButton
                    url={shareUrl}
                    title={title}
                    windowWidth={750}
                    windowHeight={600}
                    className="Demo__some-network__share-button">
                    <LinkedinIcon
                    iconBgStyle={'fill'}
                      size={32}
                      round />
                  </LinkedinShareButton>
                  </div>
            
                  <div className="Demo__some-network">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button">
                    <FacebookIcon
                      size={32}
                      round />
                  </FacebookShareButton>
                </div>
            
                <div className="Demo__some-network">
                <TwitterShareButton
                  url={shareUrl}
                  quote={title}
                  className="Demo__some-network__share-button">
                  <TwitterIcon
                    size={32}
                    round />
                </TwitterShareButton>
              </div>
              </div>

                </div>

                {strength === "none" ?
                    <h3>You have no clear bias.</h3>                
                    :
                    <div className='score-explanation'>
                    <h3>You are {strength} inclined towards associating&nbsp;
                        {isBiasCompatible ? this.props.cBlock.leftCategoryLabels[0] : this.props.iBlock.leftCategoryLabels[0]}
                        &nbsp;with&nbsp;
                        {isBiasCompatible ? this.props.cBlock.leftCategoryLabels[1] : this.props.iBlock.leftCategoryLabels[1]}
                        ,&nbsp;and&nbsp;
                        {isBiasCompatible ? this.props.cBlock.rightCategoryLabels[0] : this.props.iBlock.rightCategoryLabels[0]}
                        &nbsp;with&nbsp;
                        {isBiasCompatible ? this.props.cBlock.rightCategoryLabels[1] : this.props.iBlock.rightCategoryLabels[1]}.
                    </h3>
                </div>
                }

                <Link to='/'><button>Take another test</button></Link>
                <a href="https://hrx.tech/" target="blank">Learn more about HRx &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
