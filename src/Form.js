import React, { Component } from 'react';
import './App.css';
import './Form.css';
import Results from './Results';

class Form extends Component {
    constructor(props) {
        super(props);

        // Set Initial State
        this.state = {
            race: '',
            gender: '',
            age: '',
            email: '',
            completedForm: false
        }

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

    handleChange(e) {
        // Get value of selected option
        const value = e.target.value;
        // Get category of selected option
        const name = e.target.name;

        // Set appropriate information in state
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.updateResults();
    }

    // Function to update postman record with form results
    updateResults() {
        this.setState({ isLoading: true });
        // Function to send response times to Postman
        fetch('https://us-central1-hrx-biastest.cloudfunctions.net/submitTest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                testId: this.props.testId,
                r1Times: this.props.r1,
                r2Times: this.props.r2,
                r3Times: this.props.r3,
                r4Times: this.props.r4,
                source: 'BC Assessment',
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            })
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this.setState({
                score: responseJson.score,
                isLoading: false,
                completedForm: true
            })
        }).catch((e) => console.log(e));
    }

    render() {

        if (this.state.completedForm) {
            return (
                <Results
                    testTitle={this.props.testTitle}
                    score={this.state.score}
                    cBlock={this.props.cBlock}
                    iBlock={this.props.iBlock}
                />
            )
        } else if(this.state.isLoading) {
            return <div><div className="loading-spinner"></div><p>Please wait while we calculate your results...</p></div>
        }

        return (
            <div>
                <h1>Information</h1>
                <p>Please fill in your information to contribute to HRx research.</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input name='firstName'
                            type='text'
                            value={this.state.firstName}
                            onChange={this.handleChange} />
                    </label>

                    <label>
                        Last Name:
                        <input name='lastName'
                            type='text'
                            value={this.state.lastName}
                            onChange={this.handleChange} />
                    </label>

                    <label>
                        Email:
                        <input name='email'
                            type='email'
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </label>

                    <input type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}

export default Form;
