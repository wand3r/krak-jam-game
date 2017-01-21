import React, { Component } from "react"
import { css } from 'glamor'
import { Rooms } from '../rooms'
import { Questions } from '../questions'
import { initializeConnection, getConnection } from '../../../lefrex-js/connection-provider'
import { initialize as initializeActionProcessor } from '../../../lefrex-js/action-processor'
import { initialize as initializeEventAggregator } from '../../../lefrex-js/event-aggregator'

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
    connected: false,
    step: "rooms",
    roomId: undefined,
  };
  componentDidMount() {
    initializeConnection()
      .then(x => {
        initializeActionProcessor(getConnection());
        initializeEventAggregator(getConnection());
        this.setState({connected: true})
      })
      .catch(x => { throw new Error(x) })
  };
  render() {
    const { step, roomId, connected } = this.state;
    return (
      <div {...css({width: "100%", padding: "2em"})}>
      {connected &&
        <div {...css({height: "100%", display: "flex"})}>
          {step === "rooms" ? <Rooms openRoom={roomId => this.setState({step: "room", roomId})} /> :
            step === "room" ? <Room roomId={roomId} /> :
            step === "questions" ? <Questions /> :
            undefined}
        </div>
      }
      </div>
    )
  }
}
