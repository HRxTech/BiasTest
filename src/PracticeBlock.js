import React, { Component } from 'react';

var contentful = require('contentful');

var client = contentful.createClient({
  space: '4xbeshmjlgqs',
  accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentBlockTitle : ''
    }
  }

  // Function to handle first HTTP request
  componentWillMount(){
    this.setState({ isLoading : true });
    // Retrieve all entries of Practice Block content type
    client.getEntries({ 'content_type' : 'practiceBlock', include: 5 })
          .then((response) => {

            const currentBlockData = response.items[0].fields;
            const currentBlockTitle = currentBlockData.practiceBlockTitle;
            
            const leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
            const leftCategoryItemsArray = currentBlockData.leftCategory.fields.categoryItems;

            const rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
            const rightCategoryItemsArray = currentBlockData.rightCategory.fields.categoryItems;            

            const totalCategoryItemsArray = [...leftCategoryItemsArray, ...rightCategoryItemsArray];

            // Set Current Block Title and Category Names in state
            this.setState({
               currentBlockTitle : currentBlockTitle,
               leftCategoryName : leftCategoryName,
               rightCategoryName : rightCategoryName,
               categoryItemsArray : totalCategoryItemsArray,
               currentQuestionIndex: 0,
               isLoading: false
            })            
          })
          .catch(console.error);
  }

  componentDidMount(){
    // Function to handle key press
    document.addEventListener('keydown', (event) => {
      const key = event.key;

      var currentQIndex = this.state.currentQuestionIndex;
      
      if(currentQIndex < this.state.categoryItemsArray.length -1 ) {
        currentQIndex++;
        this.setState({ currentQuestionIndex: currentQIndex });
      }

      if( key === 'ArrowRight'){
        console.log('Male');
      }else if( key === 'ArrowLeft'){
        console.log('Female');
      }
    })
  }

  render() {
    if(this.state.isLoading){
      return (
        <div className = 'loader'>Loading</div>
      )
    }
    var categoryItems = this.state.categoryItemsArray;
    var index = this.state.currentQuestionIndex;

    return (
      <div className="PracticeBlock">
        <h1>Practice Block</h1>
        <h2>{this.state.currentBlockTitle}</h2>

        {categoryItems[index].fields.word}
        
        <h3>{this.state.leftCategoryName}</h3>
        <h3>{this.state.rightCategoryName}</h3>

      </div>
    );
  }
}

export default App;
