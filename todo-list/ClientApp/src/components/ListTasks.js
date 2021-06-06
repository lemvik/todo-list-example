import React, { Component } from 'react';
import {TaskCard} from "./TaskCard";

export class ListTasks extends Component {
  static displayName = ListTasks.name;

  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true };
    this.taskDeleted = this.taskDeleted.bind(this)
    this.taskBeingEdited = this.taskBeingEdited.bind(this)
  }

  componentDidMount() {
    this.fetchUserTasks();
  }
  
  taskDeleted() {
    this.fetchUserTasks(); 
  }
  
  taskBeingEdited(taskId) {
    this.props.history.push(`/edit-task/${taskId}`)
  }

  renderUserTasks(userTasks) {
    return (
        <div className="container-fluid">
          {userTasks.map(userTask => (
              <TaskCard key={userTask.id}
                        onDelete={this.taskDeleted} 
                        onEdit={this.taskBeingEdited}
                        className="m-2" 
                        task={userTask}/>
          ))} 
        </div>
    )
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUserTasks(this.state.tasks);

    return (
      <div>
        <h3>
          Tasks list
          <small className="m-2 text-muted">Below are users  tasks</small>
        </h3>
        {contents}
      </div>
    );
  }

  async fetchUserTasks() {
    const response = await fetch('tasks');
    const paginated = await response.json();
    const data = paginated.payload;
    this.setState({ tasks: data, loading: false });
  }
}
