import React, { Component } from 'react';
import { createClient } from 'contentful';

// TODO: DRY - repeated code.
var client = createClient({
    space: '4xbeshmjlgqs',
    accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
  });

// FOR PRACTICE BLOCK: Function to create array of category names and their correct categories
function createCategoryWordsAndAnswersArray(array, newArray, correctCategory){
    array.forEach((oneItem) => {
        newArray.push( {
          correctCategory : correctCategory,
          categoryItem : oneItem.fields.word
        })
      })
}

// FOR TEST BLOCK: Function to extract categories from array and put correct answers
// function createTestCategoryWordsAndAnswersArray(array, newArray){
//     array.forEach((oneObject) => {
//         // Extract category items
//         oneObject.fields.categoryItems.forEach((oneItem) => {
//             newArray.push({
//                 correctCategory : oneObject.fields.categoryName,
//                 categoryItem : oneItem.fields.word
//             })
//         })
//     })
// }

// FOR TEST BLOCK: Function to extract 3 categories from array and put correct answers
function createTestCategoryWordsAndAnswersArray(array, newArray){
    array.forEach((oneObject) => {
        for(let i = 0; i < 3; i++){
            newArray.push({
                correctCategory : oneObject.fields.categoryName,
                categoryItem : oneObject.fields.categoryItems[i].fields.word
            })
        }
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
          currentBlockIndex: 0,
          currentBlockTitle: '',// this.props.currentBlockIndex;
          leftCategoryName: '',
          leftCategoryItems: [],
          rightCategoryName: '',
          rightCategoryItems: [],
          isPractice: true
        }

        this.onClickPass = this.onClickPass.bind(this);
        this.displayCategoriesItems = this.displayCategoriesItems.bind(this);
    }

    // Function to handle first HTTP request
  componentWillMount() {
        this.setState({ isLoading: true });
        // Retrieve all entries of Practice Block content type
        client.getEntries({ 'content_type': 'practiceBlock', include: 5 })
                .then((response) => {

                    const currentBlockData = response.items[this.state.currentBlockIndex].fields;
                    const currentBlockTitle = currentBlockData.practiceBlockTitle;

                    var leftCategoryItemsArray = [];
                    var rightCategoryItemsArray = [];
                    
                    // If test is practice..
                    if( this.state.isPractice ) {
                        var leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
                        var leftCategoryItemsData = currentBlockData.leftCategory.fields.categoryItems;  
                        
                        var rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
                        var rightCategoryItemsData = currentBlockData.rightCategory.fields.categoryItems;
                        
                        // Get array of category words and their correct categories
                        createCategoryWordsAndAnswersArray(leftCategoryItemsData, leftCategoryItemsArray, leftCategoryName);
                        createCategoryWordsAndAnswersArray(rightCategoryItemsData, rightCategoryItemsArray, rightCategoryName);

                    // If test is not practice...
                    } else {

                        createTestCategoryWordsAndAnswersArray(currentBlockData.leftCategories, leftCategoryItemsArray);
                        createTestCategoryWordsAndAnswersArray(currentBlockData.rightCategories, rightCategoryItemsArray);
                    }

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

    // Click handler to route TestLanding to TestBlock
    onClickPass(e) {
        e.preventDefault();
        this.props.history.push({
          pathname: '/test',
          state: this.state
        })
      }

    // Function to output category items
    displayCategoriesItems(categoryItems){
        return (
            <td>
                {categoryItems.map((oneItem, i) => {
                    return (
                        <span key={oneItem.categoryItem}>
                            {!!i && ", "}
                            {oneItem.categoryItem}
                        </span>
                    )
                })}
            </td>
        )
    }
    
    render() {

        // Loader...
        if(this.state.isLoading){
            return (
                <h1>Loading...</h1>
            )
        }

        return (
        <div>
            <h1>Bias Test - Gender/Career</h1>
            <h2>{this.state.currentBlockTitle}</h2>
            <p>For this test, you will be asked to categorize different words.</p> 

            <table className='categories-table'>
                <tbody>
                    <tr>
                        <th>Category Name</th>
                        <th>Category Items</th>
                    </tr>
                    <tr>
                        <td>{this.state.leftCategoryName}</td>
                        {this.displayCategoriesItems(this.state.leftCategoryItems)}
                    </tr>
                    <tr>
                        <td>{this.state.rightCategoryName}</td>
                        {this.displayCategoriesItems(this.state.rightCategoryItems)}                        
                    </tr>
                </tbody>
            </table>

                <button onClick={this.onClickPass}>
                    Start {this.state.isPractice ? 'Practice Test' : 'Test'}
                </button>
        </div>
        
        )
    }
}

export default TestLanding;