import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

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
        let results;
        let score = this.props.score / 1000;
        let isBiasCompatible;
        let strength;
        let color;

        if (score <= -0.15) {
            isBiasCompatible = false;
        } else if (score >= 0.15) {
            isBiasCompatible = true;
        }

        // Calculate strength
        if (score >= -0.15 && score < 0.15) {
            strength = "none";
            color = '#27C390';
        } else if ((score >= 0.15 && score < 0.35) || (score >= -0.35 && score < -0.15)) {
            strength = "slightly";
            color = '#FFBF05';
        } else if ((score >= 0.35 && score < 0.65) || (score >= -0.65 && score < -0.35)) {
            strength = "moderately";
            color = '#f98354'
        } else if ((score >= 0.65 && score < 2 || score >= -2 && score < -0.65)) {
            strength = "strongly";
            color = '#FC5561';
        } else {
            strength = "very strongly";
            color = '#19223D';
        }

        console.log(score);

        if (strength === "none") {
            results = 'I took the HRx Hidden Bias Test and my results show that I have no clear bias. Take the test!'
        } else {
            results = `I took the HRx Hidden Bias Test and my results show that I am ${strength} inclined towards associating
        ${isBiasCompatible ? this.props.cBlock.leftCategoryLabels[0] : this.props.iBlock.leftCategoryLabels[0]}
        with
        ${isBiasCompatible ? this.props.cBlock.leftCategoryLabels[1] : this.props.iBlock.leftCategoryLabels[1]}
        and
        ${isBiasCompatible ? this.props.cBlock.rightCategoryLabels[0] : this.props.iBlock.rightCategoryLabels[0]}
        with
        ${isBiasCompatible ? this.props.cBlock.rightCategoryLabels[1] : this.props.iBlock.rightCategoryLabels[1]}.Take the test!`
        }

        console.log(results);

        return (
            <div>
                <h1>{this.props.testTitle} Bias Test Results</h1>
                <div className='score-share-container'>
                    <div className='score-circle' style={{ backgroundColor: color }}>
                        <p className='score-title'>Your score:</p>
                        <p className='score'>{Math.round(score * 100) / 100}</p>
                    </div>

                    <div className='share-results'>
                        <p>Share your results</p>

                        <div className="share-container">
                            <div className="share-linkedin">
                                <LinkedinShareButton
                                    url={shareUrl}
                                    title={title}
                                    description={results}
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
                                    quote={results}
                                    className="share-button">
                                    <FacebookIcon
                                        size={32}
                                        round />
                                </FacebookShareButton>
                            </div>

                            <div className="share-twitter">
                                <TwitterShareButton
                                    url={shareUrl}
                                    via={'HRxTech'}
                                    className="share-button">
                                    <TwitterIcon
                                        size={32}
                                        round />
                                </TwitterShareButton>
                            </div>
                        </div>
                    </div>

                </div>
                {strength === "none" ?
                    <h3>You have no clear bias.</h3>
                    :
                    <div className='score-explanation'>
                        <h2>{`You are ${strength} inclined towards associating
                    ${isBiasCompatible ? this.props.cBlock.leftCategoryLabels[0] : this.props.iBlock.leftCategoryLabels[0]}
                            with 
                    ${isBiasCompatible ? this.props.cBlock.leftCategoryLabels[1] : this.props.iBlock.leftCategoryLabels[1]}
                            and
                    ${isBiasCompatible ? this.props.cBlock.rightCategoryLabels[0] : this.props.iBlock.rightCategoryLabels[0]}
                            with
                    ${isBiasCompatible ? this.props.cBlock.rightCategoryLabels[1] : this.props.iBlock.rightCategoryLabels[1]}.`}
                </h2>
                    </div>

                }

                <Link to='/'><div className="button" style={{ textAlign: 'center', marginBottom: '1.5em' }}>Take another test</div></Link>
                <a href="https://hrx.tech/" target="blank">Learn more about HRx &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
