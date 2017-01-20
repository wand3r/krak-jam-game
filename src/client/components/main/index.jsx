import React, { Component } from "react";

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
    step: "rooms"
  }
  render() {
    const { step } = this.state
    return (
      <div>
        <div>
          <button onClick={() => this.setState({step: "rooms"})}>Rooms</button>
          <button onClick={() => this.setState({step: "room"})}>Room</button>
          <button onClick={() => this.setState({step: "questions"})}>Questions</button>
        </div>
        <div>
          {steps[step].component}
        </div>
      </div>
    )
  }
}
