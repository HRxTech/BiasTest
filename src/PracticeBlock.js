import React, { Component } from 'react';
import { createClient } from 'contentful'

// TODO: DRY - repeated code.
var client = createClient({
  space: '4xbeshmjlgqs',
  accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
});

// IF THIS BLOCK WAS REUSED AS TEST BLOCK, WILL RECEIVE FOLLOWING DATA AS PROPS...
const testType = 'Practice';
// const testData =  Previous sacreen make API and retrieve all data
const currentBlockIndex = 0;

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to merge arrays and store correct answer
function mergeArraysAndAnswers(array, newArray, correctCategory){
  array.map((oneItem) => {
    newArray.push( {
      correctCategory : correctCategory,
      categoryItem : oneItem.fields.word
    })
  })
}

// START OF COMPONENT ------------------------------------------------------------------
class PracticeBlock extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      currentBlockIndex: 1,// this.props.currentBlockIndex;
      currentBlockTitle: '',
      leftCategoryName: '',
      rightCategoryName: '',
      currentItemIndex: 0,
      isLoading: false,
      isFirstScreen: true
    }

  }

  // Function to handle first HTTP request
  componentWillMount() {
    this.setState({ isLoading: true });
    // Retrieve all entries of Practice Block content type
    // If previous screen makes API request, then store props in own state before retrieving it
    client.getEntries({ 'content_type': 'practiceBlock', include: 5 })
      .then((response) => {

        const currentBlockData = response.items[this.state.currentBlockIndex].fields;
        const currentBlockTitle = currentBlockData.practiceBlockTitle;

        const leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
        const leftCategoryItems = currentBlockData.leftCategory.fields.categoryItems;
        
        const rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
        const rightCategoryItems = currentBlockData.rightCategory.fields.categoryItems;

        var itemsArray = [];

        // Merge category items into single array along with their correct answers
        mergeArraysAndAnswers(leftCategoryItems, itemsArray, leftCategoryName);
        mergeArraysAndAnswers(rightCategoryItems, itemsArray, rightCategoryName);
                
        // Shuffle Array
        shuffleArray(itemsArray);

        // Set Current Block Title and Category Names in state
        this.setState({
          currentBlockTitle: currentBlockTitle,
          leftCategoryName: leftCategoryName,
          rightCategoryName: rightCategoryName,
          categoryItemsShuffled: itemsArray,
          currentItem: itemsArray[this.state.currentItemIndex],
          isLoading: false
        })
      })
      .catch(console.error);
  }

  // Function to handle key press
  componentDidMount() {

    // Listen to keypress...
    document.addEventListener('keydown', (event) => {
      const key = event.key;

      // Change state of first screen
      this.setState({ isFirstScreen: false })

      // Only do stuff if the test is not over...
      var currentItemIndex = this.state.currentItemIndex;
      if (currentItemIndex < this.state.categoryItemsShuffled.length) {
        
        // 1. Check what user answered
        if (key === 'ArrowRight') {
          var userAnswer = this.state.rightCategoryName;
        } else if (key === 'ArrowLeft') {
          var userAnswer = this.state.leftCategoryName;
        }

        // 2. Check user answer against correct category, and only increment index if answer is correct
        if(userAnswer === this.state.currentItem.correctCategory){
          currentItemIndex++;
          this.setState({
            answerIsCorrect: true,
            currentItemIndex: currentItemIndex,
            currentItem: this.state.categoryItemsShuffled[currentItemIndex]
          })
        }else{
          this.setState({
            answerIsCorrect: false
          })
        }
      }  
    })
  }

  render() {

    // Loader..
    if (this.state.isLoading) {
      return (
        <div className='loader'>Loading</div>
      )
    }

    return (
      <div className="PracticeBlock">
        <h1>Practice Block</h1>
        <h2>{this.state.currentBlockTitle}</h2>

        {this.state.currentItemIndex < this.state.categoryItemsShuffled.length?
        <p>{this.state.currentItem.categoryItem}</p>
        :
        <p>Test is finished.</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
          <h3>{this.state.leftCategoryName}</h3>
          <h3>{this.state.rightCategoryName}</h3>
        </div>

        {!this.state.isFirstScreen &&
          !this.state.answerIsCorrect &&
            <p><span style={{ color: 'red' }}>Incorrect</span><br/>Please press the other arrow key to continue</p>
         }

      </div>
    );
  }
}

export default PracticeBlock;
