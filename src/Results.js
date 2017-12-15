import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Form extends Component {
    render() {
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
