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

  // Get Current Test Block Data
  componentWillMount(){
    // Request all Practice Block Entries
    axios.get('https://cdn.contentful.com/spaces/4xbeshmjlgqs/entries?access_token=3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07&content_type=practiceBlock')
          .then((response) => {

              // Get Current Practice Block Data
              var currentPracticeBlock = response.data.items[this.state.currentPracticeBlockIndex];

              // Get Practice Block Title
              this.setState({ currentPracticeBlockTitle : currentPracticeBlock.fields.practiceBlockTitle});

              // Get Target Entry (Category) ID
              var leftCategory = currentPracticeBlock.fields.leftCategory.sys.id;

              this.getCategoryNames(leftCategory);
            })
          .catch(console.error);
  }

  // Get Practice Block Categories
  getCategoryNames(leftCategory){
    // Retrieve all items linked to the current entry
    axios.get(`https://cdn.contentful.com/spaces/4xbeshmjlgqs/entries?access_token=3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07&include=1&content_type=practiceBlock&fields.leftCategory.sys.id=${leftCategory}`)
    .then((response) => {
      var leftCategoryName = response.data.includes.Entry[1].fields.categoryName;
      var rightCategoryName = response.data.includes.Entry[0].fields.categoryName;
      

      this.setState({ 
        leftCategoryName : leftCategoryName, 
        rightCategoryName : rightCategoryName,
        questionCounter : 0
       });
    })
  }

  render() {

    var i = this.state.questionCounter;

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
