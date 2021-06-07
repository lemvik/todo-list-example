import React, {Component} from 'react';
import {TaskCard} from "./TaskCard";

export class ListTasks extends Component {
    static displayName = ListTasks.name;

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            parentIds: [],
            loading: true,
            sort: "id",
            order: "desc",
            page: 0,
            pageSize: 5,
            total: null
        };
        this.taskDeleted = this.taskDeleted.bind(this)
        this.taskBeingEdited = this.taskBeingEdited.bind(this)
        this.showSubTasks = this.showSubTasks.bind(this)
        this.goToParent = this.goToParent.bind(this)
        this.doSort = this.doSort.bind(this)
    }

    componentDidMount() {
        this.fetchUserTasks();
    }

    taskDeleted() {
        this.fetchUserTasks();
    }

    taskBeingEdited(taskId) {
        this.props.history.push(`/tasks/${taskId}/edit`)
    }
    
    showSubTasks(taskId) {
        const newParents = [...this.state.parentIds, taskId]
        this.setState({parentIds: newParents, page: 0, loading: true}, () => {
            this.fetchUserTasks() 
        })
    }
    
    goToParent() {
        const newParents = this.state.parentIds.slice(0, -1) 
        this.setState({parentIds: newParents, page: 0, loading: true}, () => {
            this.fetchUserTasks()
        })
    }

    doSort(field) {
        let direction = this.state.order;
        const currentField = this.state.sort;
        if (currentField === field) {
            direction = direction === "asc" ? "desc" : "asc";
        }
        this.setState({loading: true, sort: field, order: direction}, () => {
            this.fetchUserTasks()
        });
    }

    selectPage(page) {
        this.setState({loading: true, page: page}, () => this.fetchUserTasks())
    }

    renderUserTasks(userTasks) {
        return (
            <div className="container-fluid">
                {userTasks.map(userTask => (
                    <TaskCard key={userTask.id}
                              onDelete={this.taskDeleted}
                              onEdit={this.taskBeingEdited}
                              onShowSubTasks={this.showSubTasks}
                              className="m-2"
                              task={userTask}/>
                ))}
            </div>
        )
    }

    renderPagination() {
        const total = this.state.total;
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const count = Math.ceil(total / pageSize);
        const pages = Array.from(Array(count)).map((_, index) => index + 1)

        return (
            <nav aria-label="Tasks pagination">
                <ul className="pagination">
                    {pages.map(index => <li key={index}
                                            className={`page-item ${page === (index - 1) ? "active" : ""}`}>
                        <button className="page-link" onClick={() => this.selectPage(index - 1)}>{index}</button>
                    </li>)}
                </ul>
            </nav>
        )
    }
    
    renderBackButton() {
        const parentId = [...this.state.parentIds].pop()
        if (parentId) {
            return (<button type="button" className="m-2 btn btn-primary" onClick={() => {
                this.goToParent()
            }}>Back one level 
            </button>)
        } else {
            return <div />
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserTasks(this.state.tasks);

        let pagination = this.state.loading ? <div/> : this.renderPagination()
        let backButton = this.renderBackButton()

        return (
            <div className="container">
                <h3>
                    Tasks list
                    <small className="m-2 text-muted">Use buttons to sort</small>
                </h3>
                <div className="container p-2">
                    <div className="row">
                        <div className="col">
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("id")
                            }}>Id
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("summary")
                            }}>Summary
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("description")
                            }}>Description
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("priority")
                            }}>Priority
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("status")
                            }}>Status
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("createdAt")
                            }}>Created
                            </button>
                            <button type="button" className="m-2 btn btn-secondary" onClick={() => {
                                this.doSort("dueAt")
                            }}>Due
                            </button>
                        </div>
                        <div className="col-sm-2">
                            {backButton}
                        </div>
                    </div>
                </div>
                {contents}
                {pagination}
            </div>
        );
    }

    async fetchUserTasks() {
        const parentId = [...this.state.parentIds].pop()
        const response = await fetch('api/tasks?' + new URLSearchParams({
            parent: parentId ?? '',
            page: this.state.page,
            pageSize: this.state.pageSize,
            orderBy: this.state.sort,
            ordering: this.state.order
        }));
        const paginated = await response.json();
        const data = paginated.payload;
        this.setState({
            tasks: data,
            loading: false,
            total: paginated.total
        });
    }
}
