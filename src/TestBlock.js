import React, { Component } from 'react';

class TestBlock extends Component {
  constructor(props) {
    super(props);

    // Merge and shuffle array
      var categoryItems = this.props.blockData.iBlock.leftCategoryItems.concat(this.props.blockData.cBlock.rightCategoryItems)

    for (let i = categoryItems.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [categoryItems[i], categoryItems[j]] = [categoryItems[j], categoryItems[i]];
    }

    // Set initial state
    this.state = {
      testId: this.props.blockData.testId,
      isPractice: this.props.blockData.isPractice,
      iBlock: this.props.blockData.iBlock,            
      cBlock: this.props.blockData.cBlock,        
      isFirstRound: this.props.blockData.isFirstRound,
      isDoingTest: this.props.blockData.isDoingTest,
      isFirstScreen: true,
      currentItemIndex: 0,
      categoryItemsShuffled: categoryItems     
    }
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
        var userAnswer = '';
        if (key === 'ArrowRight') {
          userAnswer = this.state.rightCategoryName;
        } else if (key === 'ArrowLeft') {
          userAnswer = this.state.leftCategoryName;
        }

        // 2. Check user answer against correct category, and only increment index if answer is correct
        if(userAnswer === this.state.categoryItemsShuffled[currentItemIndex].correctCategory){
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

      // Get current block 
      var iBlock = this.state.iBlock;
      var cBlock = this.state.cBlock;
      var currentBlock;

      if(this.state.isFirstRound){
        currentBlock = iBlock;
      }else {
        currentBlock = cBlock;
      }

    return (
      <div className="TestBlock">
        <h1>{this.stateisPractice? 'Practice' : 'Bias Test'}</h1>
        <h2>{currentBlock.testBlockTitle}</h2>

        {this.state.currentItemIndex < this.state.categoryItemsShuffled.length ?
        <p>{this.state.categoryItemsShuffled[this.state.currentItemIndex].categoryItem}</p>
        :
        <p>Test is finished.</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
          <div className='button-group'>
            <h3>{currentBlock.leftCategoryItems[0].categoryName}</h3>
            {!this.state.isPractice &&
              <div>
                <p>or</p>
                <h3>{currentBlock.leftCategoryItems[currentBlock.leftCategoryItems.length - 1].categoryName}</h3>
              </div>
            }
            <button>&#8249;</button>
          </div>

          <div className='button-group'>
            <h3>{currentBlock.rightCategoryItems[0].categoryName}</h3>
            {!this.state.isPractice &&
              <div>
                <p>or</p>
                <h3>{currentBlock.rightCategoryItems[currentBlock.rightCategoryItems.length - 1].categoryName}</h3>
              </div>
            }
            <button>&#8250;</button>
          </div>
        </div>

        {!this.state.isFirstScreen &&
          !this.state.answerIsCorrect &&
            <p><span style={{ color: 'red' }}>Incorrect</span><br/>Please press the other arrow key to continue</p>
         }
      </div>
    );
  }
}

export default TestBlock;
