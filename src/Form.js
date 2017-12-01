import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
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
        // this.handleGetAPI = this.handleGetAPI.bind(this);
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

        // Form validation
        if(this.state.race !== '' && this.state.gender !== '' && this.state.age !== '' ){
            this.setState({ completedForm: true })
        }

        // SEND RESULTS TO API
    }

    // handleGetAPI(){
    //     axios.get('https://cdn.contentful.com/spaces/4xbeshmjlgqs/entries?access_token=3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07&content_type=biasTest')
    //          .then((response) => {
    //              console.log(response.data.items)
    //          })
    //          .catch(console.error);
    // }

    render() {
        return (
            <div>
                <h1>Information</h1>
                <p>Please fill in your information to contribute to HRx research.</p>

                {this.state.completedForm === false &&
                    <p>Please fill in all fields</p>    
                }

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
                <a href='#'>Skip to results &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
