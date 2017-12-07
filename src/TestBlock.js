import React, { Component } from 'react';

class TestBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBlockIndex: this.props.blockData.currentBlockIndex,      
      currentBlockTitle: this.props.blockData.currentBlockTitle,
      leftCategoryName: this.props.blockData.leftCategoryName,
      rightCategoryName: this.props.blockData.rightCategoryName,      
      categoryItemsShuffled: this.props.blockData.categoryItemsShuffled,
      isPractice: this.props.blockData.isPractice,
      currentItemIndex: 0,
      isFirstScreen: true,
      responseTimes: [],
      startTime: Date.now(),
    }

    this.handleAnswer = this.handleAnswer.bind(this);

  }

  // Function to handle key press
  componentDidMount() { 

    // var startTime = Date.now();

    // Listen to keypress...
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      
      // Call function to handleAnswer
      this.handleAnswer(key);

    });  

  }

  // Function to handle click
  handleAnswer(key){

    if( this.state.answerIsCorrect ){
      this.setState({
        responseTimes: this.state.responseTimes.concat(Date.now() - this.state.startTime),
        startTime: Date.now()
      })
    }else{
      this.setState({
        responseTimes: this.state.responseTimes.concat(Date.now() - this.state.startTime),
      })
    }
    
    console.log(this.state.responseTimes);

    // Change state of first screen and erase error message
    this.setState({ isFirstScreen: false, invalidKey: false })

    // Only do stuff if the test is not over...
    var currentItemIndex = this.state.currentItemIndex;

    if (currentItemIndex < this.state.categoryItemsShuffled.length) {
      
      // 1. Check what user answered
      var userAnswer = '';
      if (key === 'ArrowRight') {
        userAnswer = this.state.rightCategoryName;
      } else if (key === 'ArrowLeft') {
        userAnswer = this.state.leftCategoryName;
      } else {
        this.setState({ invalidKey: true })
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
        {this.state.isPractice?
        <h1>Practice Test</h1> :
        <h1>Bias Test</h1>}
        <h2>{this.state.currentBlockTitle}</h2>

        {this.state.currentItemIndex < this.state.categoryItemsShuffled.length ?
        <p>{this.state.categoryItemsShuffled[this.state.currentItemIndex].categoryItem}</p>
        :
        <p>Test is finished.</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
          {this.state.leftCategoryName}
          <button onClick = {() => this.handleAnswer('ArrowLeft')}>&#8249;</button>
          {this.state.rightCategoryName}
          <button onClick = {() => this.handleAnswer('ArrowRight')}>	&#8250;</button>
        </div>

        {!this.state.isFirstScreen &&
          this.state.invalidKey &&
            <p>Please use the arrow keys or press on the buttons to indicate your answer.</p>
         }

        {!this.state.isFirstScreen &&
          !this.state.answerIsCorrect &&
            !this.state.invalidKey &&
            <p><span style={{ color: 'red' }}>Incorrect</span><br/>Please press the other arrow key to continue</p>
         }
      </div>
    );
  }
}

export default TestBlock;
