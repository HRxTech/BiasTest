import React, { Component } from 'react';
import Intro from './Intro';
import Form from './Form';
import TestLanding from './TestLanding';
import OptionsPage from './OptionsPage';
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path='/' component={Intro} />
                    <Route path='/form' component={Form} />
                    <Route exact path='/test/:testName/start/:testId' component={OptionsPage} />
                    <Route exact path='/test/:testName/:stage/:testId/' component={TestLanding} />                   
                </Switch>
            </div>
        );
    }
}

export default Main;