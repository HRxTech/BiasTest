import React, { Component } from 'react';
import { createClient } from 'contentful'

// TODO: DRY - repeated code.
var client = createClient({
  space: '4xbeshmjlgqs',
  accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
});

class PracticeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBlockTitle: '',
      leftCategoryName: '',
      rightCategoryName: '',
      currentItemIndex: 0,
      isLoading: false
    }
  }

  // Function to handle first HTTP request
  componentWillMount() {
    this.setState({ isLoading: true });
    // Retrieve all entries of Practice Block content type
    client.getEntries({ 'content_type': 'practiceBlock', include: 5 })
      .then((response) => {

        const currentBlockData = response.items[0].fields;
        const currentBlockTitle = currentBlockData.practiceBlockTitle;

        const leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
        const leftCategoryItems = currentBlockData.leftCategory.fields.categoryItems;

        const rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
        const rightCategoryItems = currentBlockData.rightCategory.fields.categoryItems;

        // Combine left category items with right category items
        var itemsArray = [];
        
        leftCategoryItems.map((leftCategoryItem) => {
          itemsArray.push( {
            correctCategory : leftCategoryName,
            categoryItem : leftCategoryItem.fields.word
          })
        })

        rightCategoryItems.map((rightCategoryItem) => {
          itemsArray.push( {
            correctCategory : rightCategoryName,
            categoryItem : rightCategoryItem.fields.word
          })
        })

        // Function to shuffle array
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
        }

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

        console.log(this.state);
      })
      .catch(console.error);
  }

  // Function to handle key press
  componentDidMount() {

    // Listen to keypress...
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      var currentItemIndex = this.state.currentItemIndex;

      if (currentItemIndex < this.state.categoryItemsShuffled.length - 1) {
        currentItemIndex++;
        this.setState({ 
          currentItemIndex: currentItemIndex,
          currentItem: this.state.categoryItemsShuffled[currentItemIndex]
        });
      }

      if (key === 'ArrowRight') {
        console.log('Male');
      } else if (key === 'ArrowLeft') {
        console.log('Female');
      }
    })
  }



  render() {
    if (this.state.isLoading) {
      return (
        <div className='loader'>Loading</div>
      )
    }
    var categoryItems = this.state.categoryItemsArray;
    var index = this.state.currentQuestionIndex;

    return (
      <div className="PracticeBlock">
        <h1>Practice Block</h1>
        <h2>{this.state.currentBlockTitle}</h2>

        <p>{this.state.currentItem.categoryItem}</p>

        <h3>{this.state.leftCategoryName}</h3>
        <h3>{this.state.rightCategoryName}</h3>

      </div>
    );
  }
}

export default PracticeBlock;
