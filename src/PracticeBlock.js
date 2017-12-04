import React, { Component } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = '4xbeshmjlgqs';
const API_TOKEN = '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentPracticeBlockIndex : 0,
      currentPracticeBlockTitle : ''
    }
  }

  // Function to get Current Test Block Data
  componentWillMount(){
    // Request all Practice Block Entries
    axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=practiceBlock`)
          .then((response) => {

              // Get Current Practice Block Data
              var currentPracticeBlock = response.data.items[this.state.currentPracticeBlockIndex];

              // Get Practice Block Title and set it in the state
              this.setState({ 
                currentPracticeBlockTitle : currentPracticeBlock.fields.practiceBlockTitle
              });

              // Send Current Practice Block Data to callback function
              this.handleCategories(currentPracticeBlock);

            })
          .catch(console.error);
  }

  // Function to get Category Data
  handleCategories(currentPracticeBlock){

    const leftCategoryID = currentPracticeBlock.fields.leftCategory.sys.id;

    axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=practiceBlock&fields.leftCategory.sys.id=${leftCategoryID}`)
         .then((response) => {
          
            this.setState({ 
              leftCategoryName : response.data.includes.Entry[1].fields.categoryName,
              rightCategoryName : response.data.includes.Entry[0].fields.categoryName
             }); 
         });
  }

  render() {

    return (
      <div className="PracticeBlock">
        <h1>Practice Block</h1>
        <p>{this.state.currentPracticeBlockTitle}</p>

        <h2>{this.state.leftCategoryName}</h2>
        <h2>{this.state.rightCategoryName}</h2>
        
      </div>
    );
  }
}

export default App;
