import React, { Component } from 'react';
import './App.css';

class TestBlock extends Component {
  constructor(props) {
    super(props);

    let bd = this.props.blockData;

    // Set labels
    let blockTitle = bd.testBlockTitle;
    let leftLabel = bd.leftCategoryLabels.join(' or ');
    let rightLabel = bd.rightCategoryLabels.join(' or ');

    // Setup the questions
    let questions = [];

    // Put all the questions together. Noting, which direction is correct.
    bd.leftCategoryItems.forEach(item => {
      let q = {
        isImage: item.isImage,
        item: item.categoryItem,
        correctKey: 'ArrowLeft'
      }
      questions.push(q);
    });

    bd.rightCategoryItems.forEach(item => {
      let q = {
        isImage: item.isImage,
        item: item.categoryItem,
        correctKey: 'ArrowRight'
      }
      questions.push(q);
    });

    // shuffle it up.
    for (let i = questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    let currentQuestion = questions[0];

    this.state = {
      questions: questions,
      currentQuestionIndex: 0,
      currentQuestion: currentQuestion,
      isAnswerCorrect: true,
      isKeyValid: true,
      leftLabel: leftLabel,
      rightLabel: rightLabel,
      blockTitle: blockTitle,
      startTime: null,
      leftTimes: [],
      rightTimes: []
    }

    this.testFinished = this.testFinished.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);

  }


  // Function to handle key press
  componentDidMount() {

    // // Listen to keypress...
    // document.addEventListener('keydown', (event) => this.checkAnswer(event.key), true);
    document.addEventListener('keydown', this.checkKey, true);

    // Start time
    this.setState({
      startTime: performance.now()
    })
  }

  checkKey(event) {
    const key = event.key;
    console.log(key);

    // check is user used valid keys
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.checkAnswer(key);
    } else {
      this.setState({ isKeyValid: false })
    }
  }

  checkAnswer(key) {
    if (key === this.state.currentQuestion.correctKey) {
      // measure the time
      let stopTime = performance.now();
      let timeTaken = stopTime - this.state.startTime;
      if (key === 'ArrowLeft') {
        let l = this.state.leftTimes;
        l.push(timeTaken);
        this.setState({
          leftTimes: l
        })
      } else {
        let r = this.state.rightTimes;
        r.push(timeTaken);
        this.setState({
          rightTimes: r
        })
      }
      // move question forward by one if it is not finished.
      let i = this.state.currentQuestionIndex + 1;

      if (i === this.state.questions.length) {
        this.testFinished(this.state.leftTimes, this.state.rightTimes);
      } else {
        let currentQuestion = this.state.questions[i];
        this.setState({
          isAnswerCorrect: true,
          isKeyValid: true,
          currentQuestion: currentQuestion,
          currentQuestionIndex: i,
          startTime: performance.now() // Start timer again
        });
      }
    } else {
      this.setState({
        isAnswerCorrect: false,
        isKeyValid: true
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.checkKey, true);
  }

  // Function testFinished
  testFinished() {
    this.props.testFinished(this.state.leftTimes, this.state.rightTimes);
  }

  render() {

    return (
      <div className="TestBlock">
        <h1>{this.props.testTitle} Bias Test</h1>

        <div className='question-container'>
          {this.state.currentQuestion.isImage ?
            <img src={this.state.currentQuestion.item} alt='Category Item' className='category-image' />
            :
            <p className='question'>{this.state.currentQuestion.item}</p>
          }
        </div>

        <div className='test-controls'>
          <div className='button-group'>
            <h3>{this.state.leftLabel}</h3>
            <div onClick={() => this.checkAnswer('ArrowLeft')}><i className="fa fa-arrow-left fa-2x"></i></div>
          </div>

          <div className='button-group'>
            <h3>{this.state.rightLabel}</h3>
            <div onClick={() => this.checkAnswer('ArrowRight')}><i className="fa fa-arrow-right fa-2x"></i></div>
          </div>
        </div>

        <div className='error-messages'>
          {this.state.isKeyValid ?
            !this.state.isAnswerCorrect &&
            <p className='incorrect'><span style={{ color: 'red' }}>Incorrect</span><br />Please press the other arrow key to continue</p>
            :
            <p>Please use the left and right arrow keys on your keyboard.</p>
          }
        </div>

        <p className='progress'>{this.state.currentQuestionIndex + 1} / {this.state.questions.length}</p>
      </div>
    );
  }
}

export default TestBlock;
