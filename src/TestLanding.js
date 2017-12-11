import React, { Component } from 'react';
import { createClient } from 'contentful';
import TestBlock from './TestBlock';
import Form from './Form';

// START OF COMPONENT ---------------------------------
class TestLanding extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            testId: this.props.match.params.testId,
            isPractice: (this.props.match.params.stage === 'practice'),
            iBlock: {},
            cBlock: {},
            isFirstRound: true,
            isDoingTest: false,
            finishedAllTests: false
        }
        this.onClickPass = this.onClickPass.bind(this);
        this.testFinished = this.testFinished.bind(this);
    }

    createPracticeCategoryDataArrays(blockData, leftArray, rightArray) {
        blockData.fields.leftCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            leftArray.push({
                categoryItem: oneCategoryItem.fields.word
            });
        })

        blockData.fields.rightCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            rightArray.push({
                categoryItem: oneCategoryItem.fields.word
            });
        })
    }

    createRealCategoryDataArrays(blockData, leftArray, rightArray) {
        blockData.fields.leftCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                leftArray.push({
                    categoryItem: oneCategoryItem.fields.word
                });
            })
        });

        blockData.fields.rightCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                rightArray.push({
                    categoryItem: oneCategoryItem.fields.word
                });
            })
        });
    }

    // Function to handle first HTTP request
    componentWillMount() {
        this.setState({ isLoading: true });
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

                if (this.state.isPractice) {
                    iBlock.testBlockTitle = biasTest.practiceBlocks[0].fields.practiceBlockTitle;
                    cBlock.testBlockTitle = biasTest.practiceBlocks[1].fields.practiceBlockTitle;

                    let ibLeftCategoryData = [];
                    let ibRightCategoryData = [];
                    let cbLeftCategoryData = [];
                    let cbRightCategoryData = [];
                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[0], ibLeftCategoryData, ibRightCategoryData);
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[1], cbLeftCategoryData, cbRightCategoryData);

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
                    // Set real test block titles in state
                    iBlock.testBlockTitle = biasTest.incompatibleBlock.fields.testBlockTitle;
                    cBlock.testBlockTitle = biasTest.compatibleBlock.fields.testBlockTitle;

                    let ibLeftCategoryData = [];
                    let ibRightCategoryData = [];
                    let cbLeftCategoryData = [];
                    let cbRightCategoryData = [];

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createRealCategoryDataArrays(biasTest.incompatibleBlock, ibLeftCategoryData, ibRightCategoryData);
                    this.createRealCategoryDataArrays(biasTest.compatibleBlock, cbLeftCategoryData, cbRightCategoryData);

                    iBlock.leftCategoryItems = ibLeftCategoryData;
                    iBlock.rightCategoryItems = ibRightCategoryData;

                    cBlock.leftCategoryItems = cbLeftCategoryData;
                    cBlock.rightCategoryItems = cbRightCategoryData;

                    iBlock.leftCategoryLabels = biasTest.incompatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (
                            leftCategory.fields.categoryName
                        )
                    });

                    iBlock.rightCategoryLabels = biasTest.incompatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (
                            rightCategory.fields.categoryName
                        )
                    });

                    cBlock.leftCategoryLabels = biasTest.compatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (
                            leftCategory.fields.categoryName
                        )
                    });

                    cBlock.rightCategoryLabels = biasTest.compatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (
                            rightCategory.fields.categoryName
                        )
                    });
                }

                // Set category data in state 
                this.setState({
                    iBlock,
                    cBlock,
                    isLoading: false
                })
            })
            .catch(console.error);
    }

    // Test finished function
    testFinished(leftTimes, rightTimes) {
        if(this.state.isFirstRound){
            this.setState({
                r3: leftTimes,
                r4: rightTimes,
                isFirstRound: false,
                isDoingTest: false 
            })
        }else{
            this.setState({
                r1: leftTimes,
                r2: rightTimes,
                finishedAllTests: true
            })
        }
    }

    // Click handler to route TestLanding to TestBlock
    onClickPass() {
        this.setState({ isDoingTest: true });
    }

    // Function to display first three category items (used for practice test and real test category 1)
    displayFirst3CategoryItems(categoryItems) {
        let first3Items = categoryItems.slice(0, 3);
        return (
            <td>
                {first3Items.map((oneItem, i) => {
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

    // Function to display first three category items (used for real test category 2)
    displayLast3CategoryItems(categoryItems) {
        let last3Items = categoryItems.slice(Math.max(categoryItems.length - 3, 1))

        return (
            <td>
                {last3Items.map((oneItem, i) => {
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
        if (this.state.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        }

        // Form...
        if(this.state.finishedAllTests){
            let responseData = {
                testId: this.state.testId,
                r1: this.state.r1,
                r2: this.state.r2,
                r3: this.state.r3,
                r4: this.state.r4
            }

            return (
                <Form 
                    responseData = {responseData}
                />
            )
        }

        // Get current block 
        let currentBlock = (this.state.isFirstRound ? this.state.iBlock : this.state.cBlock );


        // Test Block...
        if (this.state.isDoingTest) {
            return (
                <TestBlock 
                    blockData= {currentBlock}
                    testFinished={this.testFinished}/>
            )
        }


        return (
            <div>
                <h1>{this.stateisPractice ? 'Practice' : 'Bias Test'}</h1>
                <h2>{currentBlock.testBlockTitle}</h2>
                <p>For this test, you will be asked to categorize different words. The practice test will not time you. More explanation explanation explanation...</p>

                <table className='categories-table'>
                    {this.state.isPractice ?
                        <tbody>
                            <tr>
                                <th>Category Name</th>
                                <th>Category Items</th>
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
                                <th>Category Name</th>
                                <th>Category Items</th>
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

                <button onClick={this.onClickPass}>
                    Start {this.state.isPractice ? 'Practice Test' : 'Test'}
                </button>
            </div>

        )
    }
}

export default TestLanding;