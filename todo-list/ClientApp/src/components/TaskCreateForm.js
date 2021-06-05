import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

export class TaskCreateForm extends Component {
   constructor(props) {
       super(props);

       this.state = {
           summary: props.summary || '',
           description: props.description || '', 
           due: props.due || null, 
           priority: props.priority || '', 
           parent: props.parent || null
       };
       this.handleInputChange = this.handleInputChange.bind(this)
       this.handleDueChange = this.handleDueChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
   } 
   
   handleInputChange(event) {
       const target = event.target;
       const name = target.name;
       const value = target.value;
       
       this.setState({[name]: value})
   }
   
   handleDueChange(newDue) {
       this.setState({due: newDue})
   }
   
   handleSubmit(event) {
       this.props.onSubmit(this.state)
       event.preventDefault();
   }
   
   render() {
       return (
           <form onSubmit={this.handleSubmit}>
               <fieldset>
                   <legend>Create new task:</legend>
                   <label>
                       Summary:
                       <input name="summary" type="text" value={this.state.summary} onChange={this.handleInputChange}/>
                   </label>
                   <label>
                       Description:
                       <textarea name="description" value={this.state.description} onChange={this.handleInputChange}/>
                   </label>
                   <label>
                       Priority:
                       <input name="priority" type="text" value={this.state.priority} onChange={this.handleInputChange}/>
                   </label>
                   <label>
                       Due:
                       <DateTimePicker name="due" value={this.state.due} onChange={this.handleDueChange}/>
                   </label>
                   <input type="submit" value="Create"/>
               </fieldset>
           </form>
       );
   }
}
