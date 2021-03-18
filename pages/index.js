import {SiteNav} from 'components/sitenav.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

var default_state = {
    events: [
        {
            id: 1,
            title: "Summer Fundraiser",
            description: "Our big annual fundraiser.",
            roles: [
                {
                    id: 1,
                    name: "Gate",
                    description: "Manage gate operations.",
                    shifts: [
                        {
                            id: 1,
                            name: "Ticket taker",
                            description: "Take tickets and give wristbands.",
                            location: "At the gate",
                            when: "Now!"
                        },
                        {
                            id: 2,
                            name: "Greeter",
                            description: "Welcome people and show them where to go.",
                            location: "Inside the gate",
                            when: "Now!"
                        }
                        
                    ]
                },
                {
                    id: 2,
                    name: "Kitchen",
                    description: "Work the kitchen.",
                    shifts: [
                        {
                            id: 3,
                            name: "Line cook.",
                            description: "Cook food for the guests.",
                            location: "In the kitchen",
                            when: "Now!"
                        },
                        {
                            id: 4,
                            name: "Server",
                            description: "Serve food as people arrive.",
                            location: "The dining room",
                            when: "Now!"
                        }
                        
                    ]
                },
            ],
        },
    ],
}


function ShiftView(config) {
    return (
        <tr key={config.shift.id}>
        <td>
            <b>{config.shift.name}</b><br/>
            {config.shift.description}
        </td>
        <td>
            {config.shift.location}
        </td>
        <td>
            {config.shift.when}
        </td>
        <td>
            <Button variant="outline-primary">Sign Up!</Button>{' '}
        </td>
        </tr>
    )
}

function RoleView(config) {
    var shifts = config.role.shifts.map((shift) => {
        return (
            <ShiftView key={shift.id} shift={shift}></ShiftView>
        )
    })
    return (
        <Card className="roleCard">
        <Card.Body>
            <Card.Title>{config.role.name}</Card.Title>
            <Card.Text>
            {config.role.description}
            </Card.Text>
            <Button variant="outline-success">Edit</Button>{' '}
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
                    {shifts}
                </tbody>
            </Table>
        </Card.Body>
        </Card>        
    )
}

function EventView(config) {
    var roles = config.event.roles.map((role) => {
        return (
            <RoleView key={role.id} role={role}></RoleView>
        )
    })
    return (
        <Card>
        <Card.Body>
            <Card.Title>{config.event.title}</Card.Title>
            <Card.Text>
            {config.event.description}
            </Card.Text>
            <Button variant="outline-success">Edit</Button>{' '}
            {roles}
        </Card.Body>
        </Card>        
    )
}

export default function index(config) {
    var events = default_state.events.map((event) => {
        return <EventView key={event.id} event={event}></EventView>
    })
    return (
        <>
        <SiteNav/>
        <Container fluid>
            {events}
        </Container>
        </>
    )
}