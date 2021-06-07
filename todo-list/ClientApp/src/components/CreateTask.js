import React, {Component} from 'react';
import {TaskEditForm} from "./TaskEditForm";

export class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.createTask = this.createTask.bind(this)
    }

    createTask(taskDescription) {
        const history = this.props.history;
        const requestParameters = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskDescription)
        }
        fetch('api/tasks', requestParameters)
            .then(response => {
                console.log(response)
                history.push('/tasks')
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Create task</h1>
                <TaskEditForm task={{}} onSubmit={this.createTask}/>
            </div>
        )
    }
}
