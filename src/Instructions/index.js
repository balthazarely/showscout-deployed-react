import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Grid } from 'semantic-ui-react'

export default class Instructions extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button basic inverted color="orange" className="logout-btn" onClick={this.handleOpen}>Instructions</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <img className="logoPlacer2" src="Logo.png" alt="alt"/>

        <Modal.Content>
            
          <h4 className="instruction-text"><Button inverted className="plus-icon" color="orange" icon ><Icon name='plus'/></Button>  Adds an Artist to your Favorite Artists </h4> <br/>
          <h4 className="instruction-text"><Button  className="plus-icon" color="white" icon ><Icon name='plus'/></Button>  Adds an event to your Saved Events.  </h4>
          <h4 className="instruction-text"> To view an artist's top songs, hover your mouse over their image. To change the EVENTS NEARBY results, type your desired location into the input bar above it.  </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button basic inverted color="orange" className="logout-btn" onClick={this.handleClose} >
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
