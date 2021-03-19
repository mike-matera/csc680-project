import { v4 as uuidv4 } from 'uuid';

import Container from 'react-bootstrap/Container'

import React from 'react';

import SiteNav from 'components/sitenav'
import EditCard from 'components/editcard'
import ShiftList from 'components/shiftlist'


export default class VolunteerApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: props.page,
            db: props.db,
        }
    }

    update(id, key, value) {
        var newstate = this.state 
        newstate.db[id][key] = value
        this.setState(newstate)
    }

    add(parent, item) {
        var newstate = this.state 
        newstate.db[item.id] = item 
        newstate.db[parent].children.push(item.id)
        console.log(newstate)
        this.setState(newstate)
    }

    delete(item) {
        var newstate = this.state 
        for (const dbitem in newstate.db) {
            if (Array.isArray(newstate.db[dbitem].children)) {
                var got = newstate.db[dbitem].children.findIndex(x => x == item)
                if (got >= 0) {
                    newstate.db[dbitem].children.splice(got,1)
                }
            }
        }
        delete newstate.db[item]
        this.setState(newstate)
    }

    flatten(ids) {
        return ids.map((id) => {
            return this.state.db[id]
        })
    }

    render() {
        return (
            <>
            <SiteNav/>
            <Container fluid>
            {
                this.state.page.map((event) => {
                    return (
                        <EditCard 
                            key={event}
                            item={this.state.db[event]}
                            app={this}
                            content={
                                this.state.db[event].children.map((role) => {
                                    return (
                                        <EditCard 
                                        key={role}
                                        item={this.state.db[role]}
                                        app={this}
                                        content={
                                            <ShiftList 
                                                role={role} 
                                                app={this}
                                                shifts={this.flatten(this.state.db[role].children)}/>
                                        }/>
                                    )
                                })
                            }
                        />
                    )
                })
            }
           </Container>
           </>
        )    
    }
}

// This function gets called at build time
export async function getStaticProps() {
    const event1 = uuidv4()
    const role1 = uuidv4()
    const role2 = uuidv4()
    const job1 = uuidv4()
    const job2 = uuidv4()
    const job3 = uuidv4()
    const job4 = uuidv4()
    return {
        props: {
            page: [event1],
            db: {
                [event1]: {
                    id: event1,
                    name: "Summer Fundraiser",
                    description: "Our big annual fundraiser.",
                    children: [
                        role1, role2,
                    ],
                },
                [role1]: {
                    id: role1,
                    name: "Gate",
                    description: "Manage gate operations.",
                    children: [
                       job1, job2, 
                    ],
                },
                [role2]: {
                    id: role2,
                    name: "Kitchen",
                    description: "Work the kitchen.",
                    children: [
                        job3, job4
                    ]
                },
                [job1]: {
                    id: job1,
                    name: "Ticket taker",
                    description: "Take tickets and give wristbands.",
                    location: "At the gate",
                    when: "Now!"
                },
                [job2]: {
                    id: job2,
                    name: "Greeter",
                    description: "Welcome people and show them where to go.",
                    location: "Inside the gate",
                    when: "Now!"
                },
                [job3]: {
                    id: job3,
                    name: "Line cook.",
                    description: "Cook food for the guests.",
                    location: "In the kitchen",
                    when: "Now!"
                },
                [job4]: {
                    id: job4,
                    name: "Server",
                    description: "Serve food as people arrive.",
                    location: "The dining room",
                    when: "Now!"
                },

            },
        },
    }
}
