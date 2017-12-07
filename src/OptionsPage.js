import React, { Component } from 'react';
import Intro from './Intro';


class OptionsPage extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state);
        
        // console.log(chosenTest);

        // // Set Initial State
        this.state = { 
            Option:''
        }

        // Bind functions
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      console.log(e.target.value);
      if(e.target.value === 'practice'){
        
      }else{
        
      }
    }

  render() {
    var FontAwesome = require('react-fontawesome');
    return (
      <div className="OptionsPage">
      <h1>Would you like a practice?</h1>

      <div>
        <button 
          onClick={this.handleClick}
          value='practice'>Practice 
          <FontAwesome name='arrow-circle-o-right' />
        </button>
      </div>

      <div>
        <button 
          onClick={this.handleClick}
          value='test'>Start Test 
          <FontAwesome name='arrow-circle-o-right' />
        </button>
      </div>

      </div>
    );
  }
}

export default OptionsPage;