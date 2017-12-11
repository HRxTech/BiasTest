import React, { Component } from 'react';

class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            refId: this.props.refId
        }
    }

    // Get score and results from postman..
    componentWillMount(){
        // fetch('https://us-central1-hrx-biastest.cloudfunctions.net/updateTest')
        // .then((response) => {
        //     console.log(response);
        // })
    }

    render() {
        return (
            <div>
               <h1>Results</h1>

               <div className = 'score'>
                    <p>Your score</p>
                    <p>-3</p>
               </div>

               <div className = 'share-results'>
                    <p>Share your results</p>
        
               </div>

                <h2>You are moderately inclined towards xxx and xxx.</h2>
                <p>Response response response response</p>

                <button>Take another test</button>
                <a href="https://hrx.tech/" target="blank">Learn more about HRx &rsaquo;</a>
            </div>
        );
    }
}

export default Form;
