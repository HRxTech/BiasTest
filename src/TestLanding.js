import React, { Component } from 'react';
import { createClient } from 'contentful';
import TestBlock from './TestBlock';
import Form from './Form';
import './TestLanding.css';
import './App.css';
import FontAwesome from 'react-fontawesome';

// START OF COMPONENT ---------------------------------
class TestLanding extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            testId: this.props.match.params.testId,
            testTitle: '',
            isPractice: (this.props.match.params.stage === 'practice'),
            iBlock: {},
            cBlock: {},
            isFirstRound: true,
            isDoingTest: false,
            finishedAllTests: false
        }
        this.onClickPass = this.onClickPass.bind(this);
        this.testFinished = this.testFinished.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    createPracticeCategoryItemArrays(blockData, leftArray, rightArray) {

        blockData.fields.leftCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            if (oneCategoryItem.fields.isImage) {
                leftArray.push({
                    isImage: oneCategoryItem.fields.isImage,
                    categoryItem: oneCategoryItem.fields.image.fields.file.url
                })
            } else {
                leftArray.push({
                    isImage: oneCategoryItem.fields.isImage,
                    categoryItem: oneCategoryItem.fields.word
                });
            }

        })

        blockData.fields.rightCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            if (oneCategoryItem.fields.isImage) {
                rightArray.push({
                    isImage: oneCategoryItem.fields.isImage,
                    categoryItem: oneCategoryItem.fields.image.fields.file.url
                });
            } else {
                rightArray.push({
                    isImage: oneCategoryItem.fields.isImage,
                    categoryItem: oneCategoryItem.fields.word
                });
            }
        })
    }

    createRealCategoryItemArrays(blockData, leftArray, rightArray) {
        blockData.fields.leftCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                if (oneCategoryItem.fields.isImage) {
                    leftArray.push({
                        isImage: oneCategoryItem.fields.isImage,
                        categoryItem: oneCategoryItem.fields.image.fields.file.url
                    });
                } else {
                    leftArray.push({
                        isImage: oneCategoryItem.fields.isImage,
                        categoryItem: oneCategoryItem.fields.word
                    });
                }
            })
        });

        blockData.fields.rightCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                if (oneCategoryItem.fields.isImage) {
                    rightArray.push({
                        isImage: oneCategoryItem.fields.isImage,
                        categoryItem: oneCategoryItem.fields.image.fields.file.url
                    });
                } else {
                    rightArray.push({
                        isImage: oneCategoryItem.fields.isImage,
                        categoryItem: oneCategoryItem.fields.word
                    });
                }
            })
        });
    }

    // Function to handle first HTTP request
    componentWillMount() {
        this.setState({ isLoading: true });
        this.handleData();
    }

    handleData() {
        // Retrieve all entries of this test
        var client = createClient({
            space: '4xbeshmjlgqs',
            accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
        });

        client.getEntries(
            {
                content_type: 'biasTest',
                'sys.id': this.state.testId,
                include: 5
            })
            .then((response) => {

                let biasTest = response.items[0].fields;


                let iBlock = {};
                let cBlock = {};

                // Get test block explanations (same for practice and real test)
                iBlock.explanation = biasTest.incompatibleBlock.fields.explanation.fields.explanation;
                cBlock.explanation = biasTest.compatibleBlock.fields.explanation.fields.explanation;

                if (this.state.isPractice) {
                    // Get test block titles
                    iBlock.testBlockTitle = biasTest.practiceBlocks[0].fields.practiceBlockTitle;
                    cBlock.testBlockTitle = biasTest.practiceBlocks[1].fields.practiceBlockTitle;

                    // Get test block explanations

                    let ibLeftCategoryData = [];
                    let ibRightCategoryData = [];
                    let cbLeftCategoryData = [];
                    let cbRightCategoryData = [];

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createPracticeCategoryItemArrays(biasTest.practiceBlocks[0], ibLeftCategoryData, ibRightCategoryData);
                    this.createPracticeCategoryItemArrays(biasTest.practiceBlocks[1], cbLeftCategoryData, cbRightCategoryData);

                    iBlock.leftCategoryItems = ibLeftCategoryData;
                    iBlock.rightCategoryItems = ibRightCategoryData;

                    cBlock.leftCategoryItems = cbLeftCategoryData;
                    cBlock.rightCategoryItems = cbRightCategoryData;

                    // Get category label
                    iBlock.leftCategoryLabels = [biasTest.practiceBlocks[0].fields.leftCategory.fields.categoryName];
                    iBlock.rightCategoryLabels = [biasTest.practiceBlocks[0].fields.rightCategory.fields.categoryName];

                    cBlock.leftCategoryLabels = [biasTest.practiceBlocks[1].fields.leftCategory.fields.categoryName];
                    cBlock.rightCategoryLabels = [biasTest.practiceBlocks[1].fields.rightCategory.fields.categoryName];

                } else {
                    // Set real test block titles
                    iBlock.testBlockTitle = biasTest.incompatibleBlock.fields.testBlockTitle;
                    cBlock.testBlockTitle = biasTest.compatibleBlock.fields.testBlockTitle;

                    let ibLeftCategoryData = [];
                    let ibRightCategoryData = [];
                    let cbLeftCategoryData = [];
                    let cbRightCategoryData = [];

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createRealCategoryItemArrays(biasTest.incompatibleBlock, ibLeftCategoryData, ibRightCategoryData);
                    this.createRealCategoryItemArrays(biasTest.compatibleBlock, cbLeftCategoryData, cbRightCategoryData);

                    iBlock.leftCategoryItems = ibLeftCategoryData;
                    iBlock.rightCategoryItems = ibRightCategoryData;

                    cBlock.leftCategoryItems = cbLeftCategoryData;
                    cBlock.rightCategoryItems = cbRightCategoryData;

                    iBlock.leftCategoryLabels = biasTest.incompatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (leftCategory.fields.categoryName)
                    });

                    iBlock.rightCategoryLabels = biasTest.incompatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (rightCategory.fields.categoryName)
                    });

                    cBlock.leftCategoryLabels = biasTest.compatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (leftCategory.fields.categoryName)
                    });

                    cBlock.rightCategoryLabels = biasTest.compatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (rightCategory.fields.categoryName)
                    });
                }

                // Set category data in state 
                this.setState({
                    testTitle: biasTest.testTitle,
                    iBlock,
                    cBlock,
                    isLoading: false
                })
            })
            .catch(console.error);
    }

    // Test finished function
    testFinished(leftTimes, rightTimes) {

        // If test is practice, don't store times and get real test data..
        if (this.state.isPractice) {
            // If it is first round of practice...
            if (this.state.isFirstRound) {
                this.setState({
                    isFirstRound: false,
                    isDoingTest: false
                })
                // If it is the second round of practice, time for real test..
            } else {
                this.setState({
                    isPractice: false,
                    isFirstRound: true,
                    isDoingTest: false
                })

                this.handleData();
            }
            // If test is not practice...
        } else {
            // If test is first round, block = incompatible, so store times in r3 and r4
            if (this.state.isFirstRound) {
                this.setState({
                    r1: leftTimes,
                    r2: rightTimes,
                    isFirstRound: false,
                    isDoingTest: false
                })
                // If test is not first round, block = compatible, store times in r1 and r2
            } else {
                this.setState({
                    r3: leftTimes,
                    r4: rightTimes,
                    finishedAllTests: true
                })
            }
        }
    }

    // Click handler to route TestLanding to TestBlock
    onClickPass() {
        this.setState({ isDoingTest: true });
    }

    // Event listener on 'enter' to route TestLanding to TestBlock
    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key === 'Enter') {
                this.onClickPass();
            }
        })
    }

    // Function to display first three category items (used for practice test and real test category 1)
    displayFirst3CategoryItems(categoryItems) {
        let first3Items = categoryItems.slice(0, 3);
        let itemsArray = [];

        if (first3Items[0].isImage) {
            first3Items.forEach((oneItem) => {
                itemsArray.push(<img src={oneItem.categoryItem} alt='Category Item Thumbnail' className='category-thumbnail' />);
            });
        } else {
            first3Items.forEach((oneItem) => {
                itemsArray.push(oneItem.categoryItem);
            });

            itemsArray = itemsArray.join(', ');
        }

        return <td>{itemsArray}</td>;
    }

    // Function to display first three category items (used for real test category 2)
    displayLast3CategoryItems(categoryItems) {
        let last3Items = categoryItems.slice(Math.max(categoryItems.length - 3, 1))
        let itemsArray = [];

        if (last3Items[0].isImage) {
            last3Items.forEach((oneItem) => {
                itemsArray.push(<img src={oneItem.categoryItem} alt='Category Item Thumbnail' className='category-thumbnail' />);
            });
        } else {
            last3Items.forEach((oneItem) => {
                itemsArray.push(oneItem.categoryItem);
            });

            itemsArray = itemsArray.join(', ');
        }

        return <td>{itemsArray}</td>;
    }

    render() {

        // Loader...
        if (this.state.isLoading) {
            return (
                <div className="loading-spinner"></div>
            )
        }

        // Form...
        if (this.state.finishedAllTests) {
            return (
                <Form
                    testTitle={this.state.testTitle}
                    testId={this.state.testId}
                    r1={this.state.r1}
                    r2={this.state.r2}
                    r3={this.state.r3}
                    r4={this.state.r4}
                    cBlock={this.state.cBlock}
                    iBlock={this.state.iBlock}
                />
            )
        }

        // Get current block 
        let currentBlock = (this.state.isFirstRound ? this.state.cBlock : this.state.iBlock);

        // Test Block...
        if (this.state.isDoingTest) {
            return (
                <TestBlock
                    testTitle={this.state.testTitle}
                    blockData={currentBlock}
                    testFinished={this.testFinished} />
            )
        }


        return (
            <div className='TestLanding'>
                <h1>{this.state.testTitle} Bias Test</h1>
                <h2>{currentBlock.testBlockTitle}</h2>
                <p>{currentBlock.explanation}</p>

                <table className='categories-table' cellSpacing='0'>
                    {this.state.isPractice ?
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <th>Items</th>
                            </tr>

                            <tr>
                                <td>{currentBlock.leftCategoryLabels}</td>
                                {this.displayFirst3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryLabels}</td>
                                {this.displayFirst3CategoryItems(currentBlock.rightCategoryItems)}
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <th>Items</th>
                            </tr>

                            <tr>
                                <td>{currentBlock.leftCategoryLabels[0]}</td>
                                {this.displayFirst3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.leftCategoryLabels[1]}</td>
                                {this.displayLast3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryLabels[0]}</td>
                                {this.displayFirst3CategoryItems(currentBlock.rightCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryLabels[1]}</td>
                                {this.displayLast3CategoryItems(currentBlock.rightCategoryItems)}
                            </tr>
                        </tbody>
                    }

                </table>

                <p>Press the 'Start' button, or the 'Enter' key to start.</p>
                <div
                    className='button'
                    onClick={this.onClickPass}>
                    Start {this.state.isPractice ? 'Practice' : 'Test'}
                    <FontAwesome className="arrow-right" name='arrow-right' />
                </div>
            </div>

        )
    }
}

export default TestLanding;