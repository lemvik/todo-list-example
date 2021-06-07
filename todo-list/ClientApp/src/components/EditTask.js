import React, {Component} from "react";
import {TaskEditForm} from "./TaskEditForm";

export class EditTask extends Component {
    constructor(props) {
        super(props);

        this.taskId = props.match.params.id;
        this.state = {loading: true, task: null};
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount() {
        const requestParameters = {
            method: 'GET'
        };
        fetch(`api/tasks/${this.taskId}`, requestParameters)
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({loading: false, task: response})
            })
    }

    onSubmit(task) {
        const history = this.props.history;
        const requestParameters = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        }
        fetch(`api/tasks/${this.taskId}`, requestParameters)
            .then(response => {
                console.log(response)
                history.push('/tasks')
            })
    }
    
    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <h3>Editing task {this.taskId}</h3>
                    <p>Loading...</p>
                </div>
            )
        }
        
        return (
            <div className="container">
                <h3>Editing task {this.taskId}</h3> 
                <TaskEditForm editing={true} task={this.state.task} onSubmit={this.onSubmit}/> 
            </div>
        ) 
    }
}
