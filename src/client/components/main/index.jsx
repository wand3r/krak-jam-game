import React, { Component } from "react"
import { css } from 'glamor'
import { Rooms } from '../rooms'
import { Room } from '..//room'
import { Questions } from '../questions'

const steps = {
  rooms: {
    component: <Rooms />
  },
  room: {
    component: <Room />
  }, 
  questions: {
    component: <Questions />
  }
};

export class Main extends Component {
  state = {
    step: "rooms",
    roomId: undefined,
  }
  render() {
    const { step, roomId } = this.state
    return (
      <div {...css({height: "100%", display: "flex"})}>
        {step === "rooms" ? <Rooms openRoom={roomId => this.setState({step: "room", roomId})} /> :
          step === "room" ? <Room roomId={roomId} /> :
          step === "questions" ? <Questions /> :
          undefined}
      </div>
    )
  }
}
