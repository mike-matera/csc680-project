import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import DatePicker from 'react-datepicker'

import { v4 as uuidv4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";

export class ShiftRow extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        super.state = {
            mode: 'view',
        }    
    }


    doEdit() {
        this.setState({
            mode: 'edit',
        })
    }

    doUpdate() {
        this.setState({
            mode: 'view',
        })
    }

    handleChange(event) {
        const updated = this.props.shift 
        if (event instanceof Date) {            
            updated.when = event.toLocaleDateString() + " " + event.toLocaleTimeString()
        }
        else {
            updated[event.target.id] = event.target.value    
        }
        this.props.app.update(updated)
    }

    handleSelect(event) {
        console.log("SELECT:", event)
    }

    render() {
        if (this.state.mode == 'edit') {
            return (
                <tr>                    
                <td width="50%">
                    <input type="text" id="name" value={this.props.shift.name} onChange={this.handleChange}/><br/>
                    <textarea cols="40" rows="5" id="description" value={this.props.shift.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="text" id="location" value={this.props.shift.location} onChange={this.handleChange}/><br/>
                </td>
                <td>
                <DatePicker id="when"
                    selected={new Date(this.props.shift.when)}
                    onChange={this.handleChange} //only when value has changed
                    showTimeSelect showTimeInput
                />                    
                </td>
                <td>
                    <Button variant="success" onClick={() => {this.doUpdate()}}>Done</Button>
                </td>
                </tr>
            )            
        }
        else {
            return (
                <tr>
                <td width="40%">
                    <b>{this.props.shift.name}</b><br/>
                    {this.props.shift.description}
                </td>
                <td>
                    {this.props.shift.location}
                </td>
                <td>
                    {this.props.shift.when}
                </td>
                <td>
                    <Button variant="outline-success" onClick={() => {this.doEdit()}}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => {this.props.app.delete(this.props.shift.id)}}>X</Button>
                </td>
                </tr>
            )        
        }
    }
}

export default class ShiftList extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    doAdd() {
        const now = new Date()
        this.props.app.add(this.props.role, {
            id: uuidv4(),
            name: "New Shift",
            description: "Describe the shift.",
            location: "Where does it happen.",
            when: now.toLocaleDateString() + " " + now.toLocaleTimeString()

        })
    }

    handleSubmit(event) {
        this.doUpdate()
        event.preventDefault()
    }

    render() {
        const shifts = this.props.shifts
        return (
            <form onSumbit={this.handleSubmit}>
            <Table striped hover className="shiftTable">
                <thead>
                <tr>
                    <th>What</th>
                    <th>Where</th>
                    <th>When</th>
                <th></th>
                </tr>
            </thead>
            <tbody>                                
            {
                shifts.map((shift) => {
                    return (
                        <ShiftRow app={this.props.app} shift={shift}/>
                    )
                })            
            }
            </tbody>
            </Table>
            <Button onClick={() => this.doAdd()} variant="outline-success">+</Button>
            </form>
        )
    }
    
}

