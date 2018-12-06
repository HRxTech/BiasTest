import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Results.css';


class Form extends Component {
    render() {
        let results;
        let score = this.props.score / 1000;
        let isBiasCompatible;
        let strength;

        if (score <= -0.15) {
            isBiasCompatible = false;
        } else if (score >= 0.15) {
            isBiasCompatible = true;
        }

        // Calculate strength
        if (score >= -0.15 && score < 0.15) {
            strength = "none";
        } else if ((score >= 0.15 && score < 0.35) || (score >= -0.35 && score < -0.15)) {
            strength = "slightly";
        } else if ((score >= 0.35 && score < 0.65) || (score >= -0.65 && score < -0.35)) {
            strength = "moderately";
        } else if ((score >= 0.65 && score < 2) || (score >= -2 && score < -0.65)) {
            strength = "strongly";
        } else {
            strength = "very strongly";
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
            <div className='Results'>
                <h1>{this.props.testTitle} Bias Test</h1>
                <h3>Thank you for taking the test!</h3>

                <Link to='/'><div className="button" >Take another test</div></Link>
                <a href="https://hrx.tech/" target="blank">Learn more about HRx &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
