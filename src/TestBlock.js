import React, { Component } from 'react';

class TestBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBlockIndex: this.props.location.state.currentBlockIndex,      
      currentBlockTitle: this.props.location.state.currentBlockTitle,
      leftCategoryName: this.props.location.state.leftCategoryName,
      rightCategoryName: this.props.location.state.rightCategoryName,      
      categoryItemsShuffled: this.props.location.state.categoryItemsShuffled,
      isPractice: this.props.location.state.isPractice,
      currentItemIndex: 0,
      isFirstScreen: true
    }

    this.handleClick = this.handleClick.bind(this);

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
    });   
  }

  // Function to handle click
  handleClick(key){
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
  }
 
  render() {
    return (
      <div className="TestBlock">
        <h1>Practice Block</h1>
        <h2>{this.state.currentBlockTitle}</h2>

        {this.state.currentItemIndex < this.state.categoryItemsShuffled.length ?
        <p>{this.state.categoryItemsShuffled[this.state.currentItemIndex].categoryItem}</p>
        :
        <p>Test is finished.</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
          <button onClick = {() => this.handleClick('ArrowLeft')}>{this.state.leftCategoryName}</button>
          <button onClick = {() => this.handleClick('ArrowRight')}>{this.state.rightCategoryName}</button>
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
