import React, { Component } from 'react';
import axios from 'axios';

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
    axios.get('https://cdn.contentful.com/spaces/4xbeshmjlgqs/entries?access_token=3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07&content_type=practiceBlock')
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
    console.log(currentPracticeBlock);

    const leftCategoryID = currentPracticeBlock.fields.leftCategory.sys.id;

    console.log(leftCategoryID);
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
