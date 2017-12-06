import React, { Component } from 'react';

class PassValues extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
}

export default PassValues;