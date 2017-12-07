import React, { Component } from 'react';
import { createClient } from 'contentful';
import TestBlock from './TestBlock';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// TODO: DRY - repeated code.
var client = createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
  });

// Function to create array of category words and their correct categories
function createCategoryWordsAndAnswersArray(array, newArray, correctCategory){
    array.forEach((oneItem) => {
        newArray.push( {
          correctCategory : correctCategory,
          categoryItem : oneItem.fields.word
        })
      })
}

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// START OF COMPONENT ---------------------------------
class TestLanding extends Component {
    constructor(props) {
        super(props);
    
        // Set initial state
        this.state = {
          currentBlockIndex: 1,
          currentBlockTitle: '',// this.props.currentBlockIndex;
          leftCategoryName: '',
          leftCategoryItems: [],
          rightCategoryName: '',
          rightCategoryItems: []
        }
    }

    // Function to handle first HTTP request
  componentWillMount() {
        this.setState({ isLoading: true });
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
                    
                    // Get array of category words and their correct categories
                    createCategoryWordsAndAnswersArray(leftCategoryItemsData, leftCategoryItemsArray, leftCategoryName);
                    createCategoryWordsAndAnswersArray(rightCategoryItemsData, rightCategoryItemsArray, rightCategoryName);

                    // Merge and shuffle category items arrays        
                    var itemsArray = [...leftCategoryItemsArray, ...rightCategoryItemsArray];
                    shuffleArray(itemsArray);

                    this.setState({
                        currentBlockTitle: currentBlockTitle,
                        leftCategoryName: leftCategoryName,
                        leftCategoryItems: leftCategoryItemsArray,
                        rightCategoryName: rightCategoryName,
                        rightCategoryItems: rightCategoryItemsArray,
                        categoryItemsShuffled: itemsArray,
                        isLoading: false
                    })

                })
                .catch(console.error);
    }

    
  render() {

    // Loader...
    if(this.state.isLoading){
        return (
            <h1>Loading...</h1>
        )
    }

    return (
    <BrowserRouter>        
      <div>
        <h1>Bias Test - Gender/Career</h1>
        <h2>{this.state.currentBlockTitle}</h2>
        <p>For this test, you will be asked to categorize different words. The practice test will not time you. More explanation explanation explanation...</p> 

        <table className='categories-table'>
            <tbody>
                <tr>
                    <th>Category Name</th>
                    <th>Category Items</th>
                </tr>
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

            <Link to = '/practice-test'><button>Start Practice Test</button></Link>

            <Route path='/practice-test' 
                render={(routeProps) => (
                    <TestBlock {...routeProps} 
                    data = {this.state}
                    currentBlockIndex = {this.state.currentBlockIndex}
                    currentBlockTitle = {this.state.currentBlockTitle}
                    leftCategoryName = {this.state.leftCategoryName}
                    rightCategoryName = {this.state.rightCategoryName}
                    categoryItemsShuffled = {this.state.categoryItemsShuffled} />
                )}
            />
      </div>
    </BrowserRouter>
      
    )
  }
}

export default TestLanding;