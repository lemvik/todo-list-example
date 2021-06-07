import React, {Component} from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {Layout} from './components/Layout';
import {CreateTask} from './components/CreateTask';

import './custom.css'
import {ListTasks} from "./components/ListTasks";
import {EditTask} from "./components/EditTask";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' render={() => {return <Redirect to='/tasks'/>}}/>
                <Route exact path='/tasks' component={ListTasks}/>
                <Route exact path='/tasks/create' component={CreateTask}/>
                <Route exact path='/tasks/:id/edit' component={EditTask}/>
            </Layout>
        );
    }
}
