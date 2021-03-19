import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class EditCard extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
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
        const updated = this.props.item 
        updated[event.target.id] = event.target.value
        this.props.app.update(updated)
    }

    handleSubmit(event) {
        this.doUpdate()
        event.preventDefault()
    }

    render() {
        var item = this.props.item
        var stuff;        
        if (this.state.mode == 'view') {
            stuff = (
                <>
                <Card.Title>
                    {item.name}
                </Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <Button onClick={() => this.doEdit()} variant="outline-success">Edit</Button>
                </>
            )
        }
        else {
            stuff = (
                <form onSubmit={this.handleSubmit}>
                <Card.Title>
                    <input type="text" id="name" value={item.name} onChange={this.handleChange}/>
                </Card.Title>
                <Card.Text>
                    <textarea cols="80" rows="5" id="description" value={item.description} onChange={this.handleChange}/>
                </Card.Text>
                <input type="submit" value="Done" className="btn btn-success" variant="outline-success"/>
                </form>
            )
        }
        return (
            <Card className="roleCard">
            <Card.Body>
                {stuff}
                <br></br>
                {this.props.content}
            </Card.Body>
            </Card>        
        )
    }

}

export default EditCard