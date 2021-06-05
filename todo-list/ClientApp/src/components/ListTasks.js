import React, { Component } from 'react';
import {TaskCard} from "./TaskCard";

export class ListTasks extends Component {
  static displayName = ListTasks.name;

  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true };
    this.taskDeleted = this.taskDeleted.bind(this)
  }

  componentDidMount() {
    this.fetchUserTasks();
  }
  
  taskDeleted() {
    this.fetchUserTasks(); 
  }

  renderUserTasks(userTasks) {
    return (
        <div className="container-fluid">
          {userTasks.map(userTask => (<TaskCard onDelete={this.taskDeleted} className="m-2" task={userTask}/>))} 
        </div>
    )
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUserTasks(this.state.tasks);

    return (
      <div>
        <h1 id="tableLabel">Tasks list</h1>
        <p>Below are users tasks</p>
        {contents}
      </div>
    );
  }

  async fetchUserTasks() {
    const response = await fetch('tasks');
    const data = await response.json();
    this.setState({ tasks: data, loading: false });
  }
}
