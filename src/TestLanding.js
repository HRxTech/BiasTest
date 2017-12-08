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
    }

    createPracticeCategoryDataArrays(blockData, leftArray, rightArray){
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

    createRealCategoryDataArrays(blockData, leftArray, rightArray){
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

                if(this.state.isPractice){

                    // Set practice block titles in state
                    this.setState({
                        iBlock: { testBlockTitle: biasTest.practiceBlocks[0].fields.practiceBlockTitle },                        
                        cBlock: { testBlockTitle: biasTest.practiceBlocks[1].fields.practiceBlockTitle }
                    })

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[0], ibLeftCategoryData, ibRightCategoryData);                    
                    this.createPracticeCategoryDataArrays(biasTest.practiceBlocks[1], cbLeftCategoryData, cbRightCategoryData);

                }else{
                    // Set practice block titles in state
                    this.setState({
                        iBlock: { testBlockTitle: biasTest.incompatibleBlock.fields.testBlockTitle },                        
                        cBlock: { testBlockTitle: biasTest.compatibleBlock.fields.testBlockTitle }
                    })

                    // Create category names and items - returns two arrays: leftCategoryData and rightCategoryData
                    this.createRealCategoryDataArrays(biasTest.incompatibleBlock, ibLeftCategoryData, ibRightCategoryData);                    
                    this.createRealCategoryDataArrays(biasTest.compatibleBlock, cbLeftCategoryData, cbRightCategoryData);
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

                console.log(this.state);
            })
            .catch(console.error);
    }

    // Click handler to route TestLanding to TestBlock
    onClickPass() {
        this.setState({isDoingTest: true});
    }

    // Function to display first three category items (used for practice test and real test category 1)
    displayFirst3CategoryItems(categoryItems){
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
    displayLast3CategoryItems(categoryItems){
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

        if (this.state.isDoingTest) {
            return (
                <TestBlock blockData={this.state} />
            )
        }

        return (
            <div>
                <h1>{this.state.iBlock.testBlockTitle}</h1>
                <p>For this test, you will be asked to categorize different words. The practice test will not time you. More explanation explanation explanation...</p>

                <table className='categories-table'>
                    {this.state.isPractice?
                    <tbody>
                            <tr>
                                <th>Category Name</th>
                                <th>Category Items</th>
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.leftCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(this.state.iBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.rightCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(this.state.iBlock.rightCategoryItems)}
                            </tr>
                    </tbody>
                    :
                    <tbody>
                            <tr>
                                <th>Category Name</th>
                                <th>Category Items</th>
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.leftCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(this.state.iBlock.leftCategoryItems)}
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.leftCategoryItems[this.state.iBlock.leftCategoryItems.length - 1].categoryName}</td>
                                {this.displayLast3CategoryItems(this.state.iBlock.leftCategoryItems)}                                
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.rightCategoryItems[1].categoryName}</td>
                                {this.displayFirst3CategoryItems(this.state.iBlock.rightCategoryItems)}
                            </tr>

                            <tr>
                                <td>{this.state.iBlock.rightCategoryItems[this.state.iBlock.rightCategoryItems.length - 1].categoryName}</td>
                                {this.displayLast3CategoryItems(this.state.iBlock.rightCategoryItems)}    
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