import React, { Component } from 'react';
import {TaskCard} from "./TaskCard";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true };
  }

  componentDidMount() {
    this.fetchUserTasks();
  }

  static renderUserTasks(userTasks) {
    return (
        <div className="container-fluid">
          {userTasks.map(userTask => (<TaskCard task={userTask}/>))} 
        </div>
    )
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderUserTasks(this.state.tasks);

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
