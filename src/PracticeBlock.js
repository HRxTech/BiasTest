import React, { Component } from 'react';

class PracticeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItemIndex: 0,
      isFirstScreen: true
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
      if (currentItemIndex < this.props.categoryItemsShuffled.length) {
        
        // 1. Check what user answered
        var userAnswer = '';
        if (key === 'ArrowRight') {
          userAnswer = this.props.rightCategoryName;
        } else if (key === 'ArrowLeft') {
          userAnswer = this.props.leftCategoryName;
        }

        // 2. Check user answer against correct category, and only increment index if answer is correct
        if(userAnswer === this.props.categoryItemsShuffled[currentItemIndex].correctCategory){
          currentItemIndex++;
          this.setState({
            answerIsCorrect: true,
            currentItemIndex: currentItemIndex,
            currentItem: this.props.categoryItemsShuffled[currentItemIndex]
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

    console.log(this.props.data);
    return (
      <div className="PracticeBlock">
        <h1>Practice Block</h1>
        <h2>{this.props.currentBlockTitle}</h2>

        {this.state.currentItemIndex < this.props.categoryItemsShuffled.length ?
        <p>{this.props.categoryItemsShuffled[this.state.currentItemIndex].categoryItem}</p>
        :
        <p>Test is finished.</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
          <h3>{this.props.leftCategoryName}</h3>
          <h3>{this.props.rightCategoryName}</h3>
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
