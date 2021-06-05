import React, {Component} from 'react';
import {TaskCreateForm} from "./TaskCreateForm";

export class CreateTask extends Component {
    constructor(props)  {
        super(props);
        
        this.state = {creating: false};
        
        this.createTask = this.createTask.bind(this)
    }
    
    createTask(taskDescription) {
        const history = this.props.history;
        const requestParameters = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskDescription)
        }
        fetch('tasks', requestParameters)
            .then(response => {
                console.log(response)
                history.push('/list-tasks')
            })
    }
    
    render() {
        return (
            <div>
                <h1>Create task</h1>
                <TaskCreateForm onSubmit={this.createTask} />
            </div>            
        ) 
    }
}
