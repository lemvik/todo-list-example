import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {CreateTask} from './components/CreateTask';

import './custom.css'
import {ListTasks} from "./components/ListTasks";
import {EditTask} from "./components/EditTask";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/list-tasks' component={ListTasks}/>
                <Route path='/create-task' component={CreateTask}/>
                <Route path='/edit-task/:id' component={EditTask}/>
            </Layout>
        );
    }
}
