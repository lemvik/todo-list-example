import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import {statuses} from "./Status";

export class TaskEditForm extends Component {
   constructor(props) {
       super(props);
       
       const dayInMs = 24 * 3600 * 1000;
       
       this.state = {
           id: props.task.id || null,
           summary: props.task.summary || '',
           description: props.task.description || '', 
           dueAt: props.task.dueAt ? new Date(props.task.dueAt) : new Date(Date.now() + dayInMs), 
           priority: props.task.priority || 1, 
           status: props.task.status || 0,
           parentId: props.task.parentId || null
       };
       console.log(props)
       this.formId = `task-form-${this.state.id ?? 'new'}-`
       this.handleInputChange = this.handleInputChange.bind(this)
       this.handleDueChange = this.handleDueChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleParentChange = this.handleParentChange.bind(this)
   } 
   
   handleInputChange(event) {
       const target = event.target;
       const name = target.name;
       const value = name === "status" ? parseInt(target.value, 10) : target.value;
       
       this.setState({[name]: value})
   }
   
   handleParentChange(event) {
        const value = event.target.value; 
        if (value === "null" || value === "") {
            this.setState({parentId: null})
        } else {
            this.setState({parentId: parseInt(value, 10)})
        }
   }
   
   handleDueChange(newDue) {
       this.setState({dueAt: newDue})
   }
   
   handleSubmit(event) {
       this.props.onSubmit(this.state)
       event.preventDefault();
   }
   
   render() {
       return (
           <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                   <label htmlFor={`${this.formId}-summary`}>Summary:</label>
                   <input name="summary" 
                          id={`${this.formId}-summary`}
                          className="form-control" 
                          type="text" 
                          value={this.state.summary} 
                          onChange={this.handleInputChange}/>
               </div>
               <div className="form-group">
                   <label htmlFor={`${this.formId}-description`}>Description:</label>
                   <textarea name="description" 
                             id={`${this.formId}-description`}
                             className="form-control" 
                             value={this.state.description} 
                             onChange={this.handleInputChange}/>
               </div>
               <div className="form-group">
                   <label htmlFor={`${this.formId}-priority`}>Priority:</label>
                   <input name="priority"
                          id={`${this.formId}-priority`}
                          className="form-control"
                          type="text"
                          value={this.state.priority}
                          onChange={this.handleInputChange}/>
               </div>
               <div className="form-group">
                   <label htmlFor={`${this.formId}-status`}>Status:</label>
                   <select className="form-control" 
                           name="status"
                           defaultValue={this.state.status}
                           onChange={this.handleInputChange}>
                       {Object.entries(statuses).map(([val, title]) => {
                           return (
                               <option key={val} value={val}>{title}</option>
                           )
                       })}
                   </select>
               </div>
               <div className="form-group">
                   <label className="mr-2">Due:</label>
                   <DateTimePicker name="due" value={this.state.dueAt} onChange={this.handleDueChange}/>
               </div>
               <div className="form-group">
                   <label htmlFor={`${this.formId}-parent`}>Parent:</label>
                   <input name="parent"
                          id={`${this.formId}-parent`}
                          className="form-control"
                          type="text"
                          value={this.state.parentId || ""}
                          onChange={this.handleParentChange}/>
               </div>
               <button className="btn btn-primary" type="submit">{this.props.editing ? "Update" : "Create"}</button>
           </form>
       );
   }
}
