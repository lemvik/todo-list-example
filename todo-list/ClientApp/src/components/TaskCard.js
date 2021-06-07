import React, {Component} from "react";
import {statuses} from "./Status";

export class TaskCard extends Component {
    constructor(props) {
        super(props);
        
        this.deleteMe = this.deleteMe.bind(this)
        this.editMe = this.editMe.bind(this)
        this.showSubTasks = this.showSubTasks.bind(this)
        this.state = {operating: false}
    }
    
    deleteMe() {
        this.setState({operating: true});
        const props = this.props;
        const requestParameters = {
            method: 'DELETE',
        }
        fetch(`tasks/${this.props.task.id}`, requestParameters)
            .then(response => {
                console.log(response)
                props.onDelete(); 
            })
    }
    
    editMe() {
        this.props.onEdit(this.props.task.id)
    }
    
    showSubTasks() {
        this.props.onShowSubTasks(this.props.task.id) 
    }

    render() {
        return (
            <div className={`card ${this.props.className}`}>
                <div className="card-body">
                    <h3 className="card-title">Task #{this.props.task.id}</h3>
                    <div className="row">
                        <div className="col">
                            <dl>
                                <dt>Priority</dt>
                                <dd>{this.props.task.priority}</dd>
                            </dl>
                        </div>
                        <div className="col">
                            <dl>
                                <dt>Status</dt>
                                <dd>{statuses[this.props.task.status]}</dd>
                            </dl>
                        </div>
                        <div className="col">
                            <dl>
                                <dt>Created</dt>
                                <dd>{this.props.task.createdAt}</dd>
                            </dl>
                        </div>
                        <div className="col">
                            <dl>
                                <dt>Due</dt>
                                <dd>{this.props.task.dueAt}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <dl>
                                <dt>Summary</dt>
                                <dd>{this.props.task.summary}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <dl>
                                <dt>Description</dt>
                                <dd>{this.props.task.description}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-primary m-1" onClick={this.showSubTasks}>Subtasks {this.props.task.subTasksCount}</button>
                            <button type="button" className="btn btn-primary m-1" onClick={this.editMe}>Edit</button>
                            <button type="button" className="btn btn-danger m-1" onClick={this.deleteMe}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
