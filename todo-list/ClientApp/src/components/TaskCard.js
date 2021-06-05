import React, {Component} from "react";

export class TaskCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
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
                                <dd>{this.props.task.status}</dd>
                            </dl>
                        </div>
                        <div className="col">
                            <dl>
                                <dt>Created</dt>
                                <dd>{this.props.task.createdAt}</dd>
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
                </div>
            </div>
        )
    }
}
