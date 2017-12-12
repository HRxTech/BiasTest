import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Form extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
               <h1>Results</h1>

               <div className = 'score'>
                    <p>Your score</p>
                    <p>{Math.round(this.props.score * 100) / 100}</p>
               </div>

               <div className = 'share-results'>
                    <p>Share your results</p>
        
               </div>

                <h2>You are moderately inclined towards xxx and xxx.</h2>
                <p>Response response response response</p>

                <Link to='/'><button>Take another test</button></Link>
                <a href="https://hrx.tech/" target="blank">Learn more about HRx &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
