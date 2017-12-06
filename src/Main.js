import React, { Component } from 'react';
import Intro from './Intro';
import Form from './Form';
import PracticeLandingPage from './PracticeLandingPage';
import OptionsPage from './OptionsPage';
import PassValues from './PassValues';
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path='/' component={Intro} />
                    {/* both /roster and /roster/:number begin with /roster */}
                    <Route path='/form' component={Form} />
                    <Route path='/practice' component={PracticeLandingPage} />
                    <Route path='/option' component={OptionsPage} />
                    <Route path='/pass' component={PassValues} />
                </Switch>
            </div>
        );
    }
}

export default Main;