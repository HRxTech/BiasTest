import React, { Component } from 'react';
import Intro from './Intro';
import TestLanding from './TestLanding';
import OptionsPage from './OptionsPage';
import Dashboard from './Dashboard';
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path='/' component={Intro} />                  
                    <Route exact path='/test/:testName/start/:testId' component={OptionsPage} />
                    <Route exact path='/test/:testName/:stage/:testId/' component={TestLanding} />
                    <Route exact path='/reports' component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Main;