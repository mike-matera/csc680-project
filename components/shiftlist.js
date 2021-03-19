import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { v4 as uuidv4 } from 'uuid';

function ShiftItem({item, app}) {
    return (
        <tr>
        <td width="50%">
            <b>{item.name}</b><br/>
            {item.description}
        </td>
        <td>
            {item.location}
        </td>
        <td>
            {item.when}
        </td>
        <td>
            <Button variant="outline-success">Edit</Button>
            <Button variant="outline-danger" onClick={() => {app.delete(item.id)}}>X</Button>
        </td>
        </tr>
    )
}

export default class ShiftList extends React.Component {

    constructor(props) {
        super(props)        
    }

    doAdd() {
        this.props.app.add(this.props.role, {
            id: uuidv4(),
            name: "New Shift",
            description: "Describe the shift.",
            location: "Where does it happen.",
            when: "Now!"
        })
    }

    render() {
        const shifts = this.props.shifts
        return (
            <>
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
                        <ShiftItem 
                            key={shift.id}
                            item={shift}
                            app={this.props.app}
                        />
                        )
                    })
                }
            </tbody>
            </Table>
            <Button onClick={() => this.doAdd()} variant="outline-success">+</Button>
            </>
        )
    }
    
}

