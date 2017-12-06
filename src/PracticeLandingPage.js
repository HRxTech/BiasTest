import React, { Component } from 'react';
import { createClient } from 'contentful';

// TODO: DRY - repeated code.
var client = createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
  });

// Function to create array of category words and their correct categories
function getCategoryWordsAndAnswers(array, newArray, correctCategory){
    array.map((oneItem) => {
        newArray.push( {
          correctCategory : correctCategory,
          categoryItem : oneItem.fields.word
        })
      })
}

class PracticeLandingPage extends Component {
    constructor(props) {
        super(props);
    
        // Set initial state
        this.state = {
          currentBlockIndex: 0,// this.props.currentBlockIndex;
          leftCategoryName: '',
          leftCategoryItems: [],
          rightCategoryName: '',
          rightCategoryItems: []
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
            const leftCategoryItemsData = currentBlockData.leftCategory.fields.categoryItems;
            var leftCategoryItemsArray = [];
            
            const rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
            const rightCategoryItemsData = currentBlockData.rightCategory.fields.categoryItems;
            var rightCategoryItemsArray = [];
            

            getCategoryWordsAndAnswers(leftCategoryItemsData, leftCategoryItemsArray, leftCategoryName);
            getCategoryWordsAndAnswers(rightCategoryItemsData, rightCategoryItemsArray, rightCategoryName);
            

        // Set Current Block Title, Category Names and Category Items in state
        this.setState({
          currentBlockTitle: currentBlockTitle,
          leftCategoryName: leftCategoryName,
          leftCategoryItems: leftCategoryItemsArray,
          rightCategoryName: rightCategoryName,
          rightCategoryItems: rightCategoryItemsArray,
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

        <table>
            <tbody>
            <tr>
                <td>{this.state.leftCategoryName}</td>
                {this.state.leftCategoryItems.map((leftItem) => {
                    return (
                        <td key={leftItem.categoryItem}>{leftItem.categoryItem}</td>
                    )
                })}
            </tr>
            <tr>
                <td>{this.state.rightCategoryName}</td>
                {this.state.rightCategoryItems.map((rightItem) => {
                    return (
                        <td key={rightItem.categoryItem}>{rightItem.categoryItem}</td>
                    )
                })}
            </tr>
            </tbody>
        </table>
      </div>
      
    )
  }
}

export default PracticeLandingPage;