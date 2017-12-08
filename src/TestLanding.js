import React, { Component } from 'react';
import { createClient } from 'contentful';
import TestBlock from './TestBlock';

// START OF COMPONENT ---------------------------------
class TestLanding extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            currentBlockIndex: 0,
            currentBlockTitle: '',// this.props.currentBlockIndex;
            leftCategoryName: '',
            leftCategoryItems: [],
            rightCategoryName: '',
            rightCategoryItems: [],
            isPractice: (this.props.match.params.stage === 'practice'),
            testId: this.props.match.params.testId,
            isDoingTest: false
        }

        this.onClickPass = this.onClickPass.bind(this);
    }

    // Function to shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to create array of category words and their correct categories
    createCategoryWordsAndAnswersArray(array, newArray, correctCategory) {
        array.forEach((oneItem) => {
            newArray.push({
                correctCategory: correctCategory,
                categoryItem: oneItem.fields.word
            })
        })
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

                let testItem = response.items[0].fields;

                let currentBlockData;
                let currentBlockTitle;
                let leftCategoryName = '';
                let rightCategoryName = '';
                let leftCategoryItemsData;
                let leftCategoryItemsArray = [];
                let rightCategoryItemsData;
                let rightCategoryItemsArray = []
                if(this.state.isPractice) {
                    currentBlockData = testItem.practiceBlocks[this.state.currentBlockIndex].fields;
                    currentBlockTitle = currentBlockData.practiceBlockTitle;
                    leftCategoryName = currentBlockData.leftCategory.fields.categoryName;
                    rightCategoryName = currentBlockData.rightCategory.fields.categoryName;
                    
                    leftCategoryItemsData = currentBlockData.leftCategory.fields.categoryItems;
                    rightCategoryItemsData = currentBlockData.rightCategory.fields.categoryItems;
                } else {
                    if(this.state.currentBlockIndex === 0) {
                        currentBlockData = testItem.incompatibleBlock.fields;
                    } else {
                        currentBlockData = testItem.compatibleBlock.fields;
                    }
                    currentBlockTitle = currentBlockData.testBlockTitle;

                    leftCategoryName = currentBlockData.leftCategories
                    .map(function(cat){
                        return cat.fields.categoryName;
                    }).join(" / ");

                    rightCategoryName = currentBlockData.rightCategories
                    .map(function(cat){
                        return cat.fields.categoryName;
                    }).join(" / ");

                    leftCategoryItemsData = [];
                    rightCategoryItemsData = [];
                    currentBlockData.leftCategories.forEach((cat)=> { leftCategoryItemsData = leftCategoryItemsData.concat(cat.fields.categoryItems) });
                    currentBlockData.rightCategories.forEach((cat)=> { rightCategoryItemsData = rightCategoryItemsData.concat(cat.fields.categoryItems) });
                }

                // Get array of category words and their correct categories
                this.createCategoryWordsAndAnswersArray(leftCategoryItemsData, leftCategoryItemsArray, leftCategoryName);
                this.createCategoryWordsAndAnswersArray(rightCategoryItemsData, rightCategoryItemsArray, rightCategoryName);

                // Merge and shuffle category items arrays        
                var itemsArray = [...leftCategoryItemsArray, ...rightCategoryItemsArray];
                this.shuffleArray(itemsArray);

                this.setState({
                    currentBlockTitle: currentBlockTitle,
                    leftCategoryName: leftCategoryName,
                    leftCategoryItems: leftCategoryItemsArray,
                    rightCategoryName: rightCategoryName,
                    rightCategoryItems: rightCategoryItemsArray,
                    categoryItemsShuffled: itemsArray,
                    isLoading: false
                })

            })
            .catch(console.error);
    }

    // Click handler to route TestLanding to TestBlock
    onClickPass() {
        this.setState({isDoingTest: true});
    }

    displayCategoriesItems(categoryItems){
        return (
            <td>
                {categoryItems.map((oneItem, i) => {
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
                <h1>Bias Test - Gender/Career</h1>
                <h2>{this.state.currentBlockTitle}</h2>
                <p>For this test, you will be asked to categorize different words. The practice test will not time you. More explanation explanation explanation...</p>

                <table className='categories-table'>
                    <tbody>
                        <tr>
                            <th>Category Name</th>
                            <th>Category Items</th>
                        </tr>
                        <tr>
                            <td>{this.state.leftCategoryName}</td>
                            {this.displayCategoriesItems(this.state.leftCategoryItems)}
                        </tr>
                        <tr>
                            <td>{this.state.rightCategoryName}</td>
                            {this.displayCategoriesItems(this.state.rightCategoryItems)}
                        </tr>
                    </tbody>
                </table>

                <button onClick={this.onClickPass}>
                    Start {this.state.isPractice ? 'Practice Test' : 'Test'}
                </button>
            </div>

        )
    }
}

export default TestLanding;