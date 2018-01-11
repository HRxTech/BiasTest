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
            skipForm: false,
            completedForm: false
        }

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateResults = this.updateResults.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

    }

    componentWillMount() {
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
                r4Times: this.props.r4
            })
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this.setState({
                refId: responseJson.refId,
                score: responseJson.score,
                isLoading: false
            })
        })
            .catch((e) => console.log(e));
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

        this.setState({
            completedForm: true
        })

    }

    // Function to update postman record with form results
    updateResults() {
        fetch('https://us-central1-hrx-biastest.cloudfunctions.net/updateTest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                refId: this.state.refId,
                race: this.state.race,
                gender: this.state.gender,
                age: this.state.age,
                email: this.state.email
            })
        }).catch(() => console.log("Cannot access"));
    }

    handleSkip() {
        this.setState({
            skipForm: true
        })
    }

    render() {

        if (this.state.completedForm || this.state.skipForm) {
            return (
                <Results
                    testTitle={this.props.testTitle}
                    score={this.state.score}
                    cBlock={this.props.cBlock}
                    iBlock={this.props.iBlock}
                />
            )
        }

        return (
            <div>
                <h1>Information</h1>
                <p>Please fill in your information to contribute to HRx research.</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Race:
                        <select name='race'
                            value={this.state.race}
                            onChange={this.handleChange} >
                            <option value=''>Select a Race</option>
                            <option value='East Asian'>East Asian</option>
                            <option value='Southeast Asian'>Southeast Asian</option>
                            <option value='African American'>African American</option>
                            <option value='Caucasian'>Caucasian</option>
                            <option value='Middle-Eastern'>Middle-Eastern</option>
                            <option value='Hispanic'>Hispanic</option>
                            <option value='Aboriginal'>Aboriginal</option>
                            <option value='Mixed'>Mixed</option>
                            <option value='Prefer not to say'>Prefer not to say</option>
                        </select>
                        
                    </label>

                    <label>
                        Gender:
                        <select name='gender'
                            value={this.state.gender}
                            onChange={this.handleChange} >
                            <option value=''>Select a Gender</option>
                            <option value='Female'>Female</option>
                            <option value='Male'>Male</option>
                            <option value='Nonbinary'>Nonbinary</option>
                            <option value='Other'>Other</option>
                            <option value='Prefer not to say'>Prefer not to say</option>
                        </select>
                    </label>

                    <label>
                        Age:
                        <input name='age'
                            type='number'
                            value={this.state.age}
                            onChange={this.handleChange} />

                    </label>

                    <p>If you are interested in hearing more about HRx, enter your email:</p>
                    <label>
                        Email:
                        <input name='email'
                            type='text'
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </label>

                    {this.state.isLoading ? <div><div className="loading-spinner"></div><p>Please wait while we calculate your results...</p></div> : <input type='submit' />}
                </form>
                {!this.state.isLoading &&
                    <div onClick={this.handleSkip}><a>Skip to results <span>&rsaquo;</span></a></div>
                }
            </div>
        );
    }
}

export default Form;
