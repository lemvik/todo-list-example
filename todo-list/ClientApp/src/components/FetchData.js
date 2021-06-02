import React, { Component } from 'react';

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
      <table className='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Summary</th>
            <th>Description</th>
            <th>Created</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map(userTask =>
            <tr key={userTask.id}>
              <td>{userTask.id}</td>
              <td>{userTask.priority}</td>
              <td>{userTask.status}</td>
              <td>{userTask.summary}</td>
              <td>{userTask.description}</td>
              <td>{userTask.createdAt}</td>
              <td>{userTask.dueAt}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
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
    const response = await fetch('usertasklist');
    const data = await response.json();
    this.setState({ tasks: data, loading: false });
  }
}
