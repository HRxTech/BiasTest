import React, { Component } from 'react';
import { createClient } from 'contentful';
import TestBlock from './TestBlock';

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
        }
        this.onClickPass = this.onClickPass.bind(this);
        this.testFinished = this.testFinished.bind(this);
    }

    createPracticeCategoryDataArrays(blockData, leftArray, rightArray) {
        blockData.fields.leftCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            leftArray.push({
                categoryName: blockData.fields.leftCategory.fields.categoryName,
                categoryItem: oneCategoryItem.fields.word
            });
        })

        blockData.fields.rightCategory.fields.categoryItems.forEach((oneCategoryItem) => {
            rightArray.push({
                categoryName: blockData.fields.rightCategory.fields.categoryName,
                categoryItem: oneCategoryItem.fields.word
            });
        })
    }

    createRealCategoryDataArrays(blockData, leftArray, rightArray) {
        blockData.fields.leftCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                leftArray.push({
                    categoryName: oneCategory.fields.categoryName,
                    categoryItem: oneCategoryItem.fields.word
                });
            })
        });

        blockData.fields.rightCategories.forEach((oneCategory) => {
            oneCategory.fields.categoryItems.forEach((oneCategoryItem) => {
                rightArray.push({
                    categoryName: oneCategory.fields.categoryName,
                    categoryItem: oneCategoryItem.fields.word
                });
            })
        });
    }

    // Function to handle first HTTP request
    componentWillMount() {
        this.setState({ isLoading: true });
        // Retrieve all entries of Practice Block content type
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

                let ibLeftCategoryData = [];
                let ibRightCategoryData = [];

                let cbLeftCategoryData = [];
                let cbRightCategoryData = [];

                if (this.state.isPractice) {

                    // Set practice block titles in state
                    this.setState({
                        iBlock: { testBlockTitle: biasTest.practiceBlocks[0].fields.practiceBlockTitle },
                        cBlock: { testBlockTitle: biasTest.practiceBlocks[1].fields.practiceBlockTitle }
                    })

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[0], ibLeftCategoryData, ibRightCategoryData);
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[1], cbLeftCategoryData, cbRightCategoryData);

                    // Get category label
                    let ibLeftCategoryLabel = [biasTest.practiceBlocks[0].fields.leftCategory.fields.categoryName];
                    let ibRightCategoryLabel = [biasTest.practiceBlocks[0].fields.rightCategory.fields.categoryName];

                    let cbLeftCategoryLabel = [biasTest.practiceBlocks[1].fields.leftCategory.fields.categoryName];
                    let cbRightCategoryLabel = [biasTest.practiceBlocks[1].fields.rightCategory.fields.categoryName];

                } else {
                    // Set real test block titles in state
                    this.setState({
                        iBlock: { testBlockTitle: biasTest.incompatibleBlock.fields.testBlockTitle },
                        cBlock: { testBlockTitle: biasTest.compatibleBlock.fields.testBlockTitle }
                    })

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createRealCategoryDataArrays(biasTest.incompatibleBlock, ibLeftCategoryData, ibRightCategoryData);
                    this.createRealCategoryDataArrays(biasTest.compatibleBlock, cbLeftCategoryData, cbRightCategoryData);

                    let ibLeftCategoryLabels = biasTest.incompatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (
                            leftCategory.fields.categoryName
                        )
                    });

                    let ibRightCategoryLabels = biasTest.incompatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (
                            rightCategory.fields.categoryName
                        )
                    });

                    let cbLeftCategoryLabels = biasTest.compatibleBlock.fields.leftCategories.map((leftCategory) => {
                        return (
                            leftCategory.fields.categoryName
                        )
                    });

                    let cbRightCategoryLabels = biasTest.compatibleBlock.fields.rightCategories.map((rightCategory) => {
                        return (
                            rightCategory.fields.categoryName
                        )
                    });
                }

                // Set category data in state 
                this.setState({
                    iBlock: Object.assign(this.state.iBlock, {
                        leftCategoryItems: ibLeftCategoryData,
                        rightCategoryItems: ibRightCategoryData
                    }),
                    cBlock: Object.assign(this.state.cBlock, {
                        leftCategoryItems: cbLeftCategoryData,
                        rightCategoryItems: cbRightCategoryData
                    }),
                    isLoading: false
                })
            })
            .catch(console.error);
    }

    // Test finished function
    testFinished() {
        console.log('Should display landing page again');
        this.setState({
            isFirstRound: false
        })
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

        // Test Block...
        // if (this.state.isDoingTest) {
        //     return (
        //         // <TestBlock 
        //         //     blockData={this.state} 
        //         //     testFinished={this.testFinished}/>
        //     )
        // }

        // Get current block 
        var iBlock = this.state.iBlock;
        var cBlock = this.state.cBlock;
        var currentBlock;

        if (this.state.isFirstRound) {
            currentBlock = iBlock;
        } else {
            currentBlock = cBlock;
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
                                <td>{currentBlock.leftCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryItems[1].categoryName}</td>
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
                                <td>{currentBlock.leftCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.leftCategoryItems[currentBlock.leftCategoryItems.length - 1].categoryName}</td>
                                {this.displayLast3CategoryItems(currentBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(currentBlock.rightCategoryItems)}
                            </tr>

                            <tr>
                                <td>{currentBlock.rightCategoryItems[currentBlock.rightCategoryItems.length - 1].categoryName}</td>
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