import Container from 'react-bootstrap/Container'

import React from 'react';

import SiteNav from 'components/sitenav'
import EditCard from 'components/editcard'
import ShiftList from 'components/shiftlist'

import { query } from 'db/sqlite'

export default class VolunteerApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: props.page,
            db: props.db,
        }
    }

    update(item) {
        var newstate = this.state 
        newstate.db[item.id] = item
        this.setState(newstate)
    }

    add(item) {
        var newstate = this.state 
        newstate.db[item.id] = item 
        newstate.db[item.parent].children.push(item.id)
        console.log(newstate)
        this.setState(newstate)
    }

    delete(item) {
        var newstate = this.state 
        var parent = newstate.db[item.parent]
        var got = parent.children.findIndex(x => x == item)
        parent.children.splice(got,1)
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

export async function getServerSideProps() {
  return { props: query() }
}
