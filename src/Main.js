import React, { Component } from 'react';
import Intro from './Intro';
import Form from './Form';
import TestLanding from './TestLanding';
import TestBlock from './TestBlock';
import OptionsPage from './OptionsPage';
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path='/' component={Intro} />
                    <Route path='/form' component={Form} />
                    <Route path='/landing' component={TestLanding} />
                    <Route path='/test' component={TestBlock} />                    
                    <Route exact path='/begin-test/:testName/:testId' component={OptionsPage} />
                </Switch>
            </div>
        );
    }
}

export default Main;