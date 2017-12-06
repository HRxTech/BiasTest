import React, { Component } from 'react';
import { createClient } from 'contentful';

// TODO: DRY - repeated code.
var client = createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
  });

class PracticeLandingPage extends Component {
    constructor(props) {
        super(props);
    
        // Set initial state
        this.state = {
          currentBlockIndex: 0,// this.props.currentBlockIndex;
        }
    }

    // Function to handle first HTTP request
  componentWillMount() {
    // Retrieve all entries of Practice Block content type
    client.getEntries({ 'content_type': 'practiceBlock', include: 5 })
          .then((response) => {

            const currentBlockData = response.items[this.state.currentBlockIndex].fields;
            const currentBlockTitle = currentBlockData.practiceBlockTitle;

            const leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
            const leftCategoryItems = currentBlockData.leftCategory.fields.categoryItems;
            
            const rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
            const rightCategoryItems = currentBlockData.rightCategory.fields.categoryItems;

        // Set Current Block Title and Category Names in state
        this.setState({
          currentBlockTitle: currentBlockTitle,
          leftCategoryName: leftCategoryName,
          leftCategoryItems: leftCategoryItems,
          rightCategoryName: rightCategoryName,
          rightCategoryItems: rightCategoryItems,
        })
      })
      .catch(console.error);
    }

    
  render() {
    return (
      <div>
      <h1>Bias Test - Gender/Career</h1>
      <h2>{this.state.currentBlockTitle}</h2>
      <p>For this test, you will be asked to categorize different words. The practice test will not time you. More explanation explanation explanation...</p> 

      {this.state.leftCategoryName}
      {this.state.leftCategoryItems}

      {this.state.rightCategoryName}
      {this.state.rightCategoryItems}
      </div>
      
    )
  }
}

export default PracticeLandingPage;