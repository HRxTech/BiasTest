import React, { Component } from 'react';
import './Form.css';
import Results from './Results';

class Form extends Component {
    constructor(props){
        super(props);

        // Set Initial State
        this.state = { 
            refId: this.props.refId,
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

    handleChange(e) {
        // Get value of selected option
        const value = e.target.value;
        // Get category of selected option
        const name = e.target.name;

        // Set appropriate information in state
        this.setState({ [name] : value });
    }

    handleSubmit(e){
        e.preventDefault();

        this.updateResults();

        this.setState({
            completedForm: true
        })

    }

    updateResults() {
        // fetch('https://us-central1-hrx-biastest.cloudfunctions.net/updateTest', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         refId: this.state.refId,
        //         race: this.state.race,
        //         gender: this.state.gender,
        //         age: this.state.age,
        //         email: this.state.email
        //     })
        // }).then((response) => {
        //     console.log(response);

        // }).catch(() => console.log("Cannot access"));
    }

    handleSkip(){
        this.setState({
            skipForm: true
        })
    }

    render() {

        if(this.state.completedForm || this.state.skipForm ){
            return(
                <Results 
                    refId = {this.state.refId}
                />
            )
        }

        return (
            <div>
                <h1>Information</h1>
                <p>Please fill in your information to contribute to HRx research.</p>

                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Race: 
                        <select name = 'race' 
                                value = {this.state.race}
                                onChange = {this.handleChange} >
                            <option value = ''>Select a Race</option>    
                            <option value = 'East Asian'>East Asian</option>
                            <option value = 'Southeast Asian'>Southeast Asian</option>                        
                            <option value = 'African American'>African American</option>
                            <option value = 'Caucasian'>Caucasian</option>
                            <option value = 'Middle-Eastern'>Middle-Eastern</option>
                            <option value = 'Hispanic'>Hispanic</option>
                        </select>
                    </label>

                    <label>
                        Gender: 
                        <select name = 'gender'
                                value = {this.state.gender}
                                onChange = {this.handleChange} >
                            <option value = ''>Select a Gender</option>        
                            <option value = 'Male'>Male</option>
                            <option value = 'Female'>Female</option>                        
                            <option value = 'Transgender'>Transgender</option>
                            <option value = 'Agender'>Agender</option>
                        </select>
                    </label>

                    <label>
                        Age:
                        <input name = 'age'
                               type = 'number'
                               value = {this.state.age}
                               onChange = {this.handleChange} />

                    </label>

                    <p>If you are interested in hearing more about HRx, enter your email:</p>
                    <label>
                        Email:
                        <input name = 'email'
                               type = 'text'
                               value = {this.state.email}
                               onChange = {this.handleChange} />
                    </label>
                    <input type = 'submit' />
                </form>
                <button onClick={this.handleSkip}>Skip to results <span>&rsaquo;</span></button>
            </div>
        );
    }
}

export default Form;
